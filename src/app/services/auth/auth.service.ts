import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthResponse, User } from '../../interfaces';
import { BASE_SERVER_URL } from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    this.loadCurrentUser();
  }

  login(user: User): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${BASE_SERVER_URL}/login`, user).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.user);
        this.router.navigate(['/tasks']);
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  private setCurrentUser(token: string): void {
    const decodedToken: User = jwtDecode(token);
    this.currentUserSubject.next(decodedToken);
  }

  private loadCurrentUser(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.setCurrentUser(token);
    }
  }
}
