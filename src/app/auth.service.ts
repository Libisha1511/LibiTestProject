import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://65.0.155.254:5001/test/auth';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    
    return this.http.post(`${this.apiUrl}/login`, loginData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.error('Bad Request:', error.error);
            return throwError('Bad Request');
          } else {
            return throwError(error);
          }
        }),
        map((response: any) => {
          console.log(response)
          if (response && response.accessToken) {
            localStorage.setItem('token', response.accessToken);
          }
          return response;
        })
      );
  }
}
