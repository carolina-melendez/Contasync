import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pais } from "../../core/models/Pais";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod";

@Injectable({
    providedIn: 'root',
})
export class PaisService {
    private url: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    // Obtiene la lista de paises
    getAll(): Observable<Pais[]> {
        return this.http.get<Pais[]>(this.url + '/pais/');
    }

    // Método que permite crear un nuevo país
    create(pais: Pais): Observable<Pais> {
        return this.http.post<Pais>(this.url + '/pais/', pais);
    }

    // Método que obtiene un solo país
    get(id: number): Observable<Pais> {
        return this.http.get<Pais>(this.url + '/pais/' + id);
    }

    // Método para actualizar país
    update(pais: Pais): Observable<Pais> {
        return this.http.put<Pais>(this.url + '/pais/' + pais.id + '/', pais);
    }

    // Método para eliminar país
    delete(id?: number): Observable<Pais> {
        return this.http.delete<Pais>(this.url + '/pais/' + id);
    }
}
