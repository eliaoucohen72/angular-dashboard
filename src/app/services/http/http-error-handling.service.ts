import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService } from '../notification/notification.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpUtilService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  private handleRequest<T>(observable: Observable<T>): Observable<T> {
    return observable.pipe(
      catchError((err: unknown) => {
        if (err instanceof HttpErrorResponse) {
          if (err.error === 'Invalid token') {
            this.notificationService.show(
              'error',
              'Invalid token, you will be redirected to the login page in 3 seconds'
            );
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 3000);
          } else {
            this.notificationService.show(
              'error',
              err.error.message || 'An error occurred'
            );
          }
        } else if (err instanceof Error) {
          this.notificationService.show('error', err.message);
        } else {
          this.notificationService.show('error', 'Unknown error');
        }
        return throwError(() => new Error('An unexpected error occurred'));
      })
    );
  }

  get<T>(url: string): Observable<T> {
    return this.handleRequest(this.http.get<T>(url));
  }

  post<T>(url: string, body: T): Observable<T> {
    return this.handleRequest(this.http.post<T>(url, body));
  }

  put<T>(url: string, body: T): Observable<T> {
    return this.handleRequest(this.http.put<T>(url, body));
  }

  delete<T>(url: string): Observable<T> {
    return this.handleRequest(this.http.delete<T>(url));
  }
}
