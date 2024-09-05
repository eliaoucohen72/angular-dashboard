import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";

const app = express();
const port = 3000;
const SECRET_KEY =
  "y]6MNJh9qDXmc1k3MkhMtP3G2Y^3Ts2Kbh=M.E^Lnc3L#nX0ar8,PNv-Av~u]=,aFE+*R6Z?9RTpa8A2wKTWE-Nh~7,-BgLv,Jn2";
const BASE_DATA_URL = "https://jsonplaceholder.typicode.com/posts";
let tasksDB = [];

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Fonction pour générer un JWT
function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
  };
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

// Middleware pour vérifier le JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token =
    authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : null;

  if (!token) {
    return res.status(403).send("Token is required");
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    req.user = decoded;
    next();
  });
}

async function initializeTasks() {
  const response = await axios.get(BASE_DATA_URL);
  tasksDB = response.data;
}

initializeTasks();

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  let user;
  if (username === "admin" && password === "admin") {
    user = { id: 1, username: "admin", role: "admin" };
  } else if (username === "user1" && password === "password") {
    user = { id: 2, username: "user1", role: "user" };
  } else {
    return res.status(401).send("Invalid credentials");
  }

  const token = generateToken(user);
  res.json({ token, user });
});

app.get("/tasks", verifyToken, async (req, res) => {
  try {
    const tasks = tasksDB.filter(
      (task) => task.userId === req.user.id || req.user.role === "admin"
    );

    res.json(tasks);
  } catch (error) {
    res.status(500).send("Error fetching tasks");
  }
});

app.get("/tasks/:id", verifyToken, async (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasksDB.find((e) => e.id === taskId);
  if (!task) {
    res.status(500).send("Task not found");
  } else if (req.user.role === "admin" || task.userId === req.user.id) {
    return res.json(task);
  } else {
    res.status(403).send("Access denied");
  }
});

app.post("/tasks", verifyToken, (req, res) => {
  const newTask = {
    id: tasksDB.length + 101,
    userId: req.user.id,
    title: req.body.title,
    body: req.body.body,
  };

  tasksDB.push(newTask);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", verifyToken, (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasksDB.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send("Task not found");
  }

  const task = tasksDB[taskIndex];

  if (req.user.role !== "admin" && task.userId !== req.user.id) {
    return res.status(403).send("Access denied");
  }

  tasksDB[taskIndex] = { ...task, title: req.body.title, body: req.body.body };
  res.json(tasksDB[taskIndex]);
});

app.delete("/tasks/:id", verifyToken, (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasksDB.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).send("Task not found");
  }

  const task = tasksDB[taskIndex];

  if (req.user.role !== "admin" && task.userId !== req.user.id) {
    return res.status(403).send("Access denied");
  }

  tasksDB.splice(taskIndex, 1);
  console.log("length: ", tasksDB.length);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
