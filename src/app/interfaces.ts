export interface Task {
  id?: number; // only for the put request
  userId: number;
  title: string;
  body: string;
}
