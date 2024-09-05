export type NotificationType = 'success' | 'error';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
}

export interface AuthResponse {
  token: string;
  user: User;
}
export interface Task {
  id?: number; // only for the put request
  userId: number;
  title: string;
  body: string;
}
