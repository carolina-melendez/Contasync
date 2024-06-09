import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { Rol } from "../../../core/models/Rol";
import { Permission } from "../../../core/models/Permission";
import { environment } from "../../../../environments/environment.prod";
import { catchError } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class RolService{
    private url: string = environment.apiUrl;

    constructor(private http: HttpClient){}

    // Obtiene la lista de roles
    getAll(): Observable<Rol[]> {
        return this.http.get<Rol[]>(this.url + '/rol');
    }
      

  // Método que permite crear un nuevo rol
  create(rol: Rol): Observable<Rol> {
    return this.http.post<Rol>(`${this.url}/rol`, rol).pipe(
      catchError(this.handleError)
    );
  }

  // Método que obtiene un solo rol
  get(id: number): Observable<Rol> {
    return this.http.get<Rol>(`${this.url}/rol/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para actualizar rol
  update(rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.url}/rol/${rol.id}`, rol).pipe(
      catchError(this.handleError)
    );
  }

  // Método para eliminar rol
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/rol/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener todas las permissions
  getPermissions(): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.url}/permission`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
