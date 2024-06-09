import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url: string = environment.apiUrl;

    constructor(private http: HttpClient) { }

    register(user: any): Observable<any> {
        return this.http.post(`${this.url}/auth/register`, user);
    }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.url}/auth/login`, credentials);
    }

    getProfile(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.get(`${this.url}/auth/me`, { headers });
    }

    logout(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.post(`${this.url}/auth/logout`, {}, { headers });
    }

    refresh(): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        });
        return this.http.post(`${this.url}/auth/refresh`, {}, { headers });
    }

    resetPassword(email: string, password: string): Observable<any> {
        return this.http.post(`${this.url}/auth/password_reset`, { email, password });
    }
    
}
