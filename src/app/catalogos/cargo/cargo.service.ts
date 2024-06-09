import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cargo } from "../../core/models/Cargo";
import { environment } from "../../../environments/environment.prod";

@Injectable({
    providedIn: 'root',
})
export class CargoService {

    private url: string = environment.apiUrl;

    constructor(private http: HttpClient) {}

    // Obtenemos la lista de cargos de la base
    getAll(): Observable<Cargo[]> {
        return this.http.get<Cargo[]>(this.url + '/cargo');
    }

    // Método que permite crear un nuevo cargo
    create(cargo: Cargo): Observable<Cargo> {
        return this.http.post<Cargo>(this.url + '/cargo/', cargo);
    }

    // Método que obtiene un solo cargo
    get(id: number): Observable<Cargo> {
        return this.http.get<Cargo>(this.url + '/cargo/' + id);
    }

    // Método para actualizar cargo
    update(cargo: Cargo): Observable<Cargo> {
        return this.http.put<Cargo>(this.url + '/cargo/' + cargo.codigo_cargo + '/', cargo);
    }

    // Método para eliminar cargo
    delete(id?: number): Observable<Cargo> {
        return this.http.delete<Cargo>(this.url + '/cargo/' + id);
    }
}
