import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces';
import { AuthService } from '../auth/auth.service';
import { HttpUtilService } from '../http/http-error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private BASE_URL = 'http://localhost:3000/tasks';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private httpUtilService: HttpUtilService
  ) {}

  getAll(): Observable<Task[]> {
    const user = this.authService.getUser();

    if (user?.role === 'admin') {
      return this.httpUtilService.get<Task[]>(this.BASE_URL);
    } else {
      return this.httpUtilService.get<Task[]>(
        `${this.BASE_URL}?userId=${user?.id}`
      );
    }
  }

  getOne(id: number): Observable<Task> {
    return this.httpUtilService.get<Task>(`${this.BASE_URL}/${id}`);
  }

  create(payload: Task): Observable<Task> {
    return this.httpUtilService.post<Task>(this.BASE_URL, payload);
  }

  edit(payload: Task): Observable<Task> {
    return this.httpUtilService.put<Task>(`${this.BASE_URL}/${payload.id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.httpUtilService.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
