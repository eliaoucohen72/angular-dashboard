import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(this.BASE_URL);
  }

  getOne(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.BASE_URL}/${id}`);
  }

  create(payload: Task): Observable<void> {
    return this.http.post<void>(this.BASE_URL, payload);
  }

  edit(payload: Task): Observable<void> {
    return this.http.put<void>(`${this.BASE_URL}/${payload.id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
