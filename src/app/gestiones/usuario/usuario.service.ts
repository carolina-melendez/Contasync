import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/models/Usuario';
import { environment } from '../../../environments/environment.prod';
import { Rol } from '../../core/models/Rol';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private url: string = environment.apiUrl; 
    constructor(private http: HttpClient) {}

    // Obtener la lista de usuarios
    getAll(): Observable<User[]> {
        return this.http.get<User[]>(this.url + '/user');
    }

    // Crear un nuevo usuario
    create(user: User): Observable<User> {
        return this.http.post<User>(this.url + '/auth/register', user);
    }

    // Obtener un solo usuario
    get(id: number): Observable<User> {
        return this.http.get<User>(this.url + '/user/' + id);
    }

    // Actualizar usuario
    update(id: number, user: User): Observable<User> {
        return this.http.put<User>(this.url + '/user/' + id, user);
    }

    // Eliminar usuario
    delete(id: number): Observable<void> {
        return this.http.delete<void>(this.url + '/user/' + id);
    }

    // Obtener la lista de roles
    getRoles(): Observable<Rol[]> {
        return this.http.get<Rol[]>(this.url+'/rol');
    }
}
