import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = 'http://65.0.155.254:5001/admin/department'; 

  constructor(private http: HttpClient) { }

  getDashboardList(): Observable<any> {
    const yourAuthToken = this.getAuthToken();

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${yourAuthToken}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/list`, { headers }).pipe(
      catchError((error) => {
        console.error('Error fetching dashboard list:', error);
        throw error; 
      })
    );
  }

  private getAuthToken(): string {

    return localStorage.getItem('token') || '';
  }
}
