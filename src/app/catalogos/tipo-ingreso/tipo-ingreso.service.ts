import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoIngreso } from "../../core/models/TipoIngreso";
import { environment } from "../../../environments/environment.prod";

@Injectable({
    providedIn: 'root',
})
export class TipoIngresoService{
    private url: string = environment.apiUrl;

    constructor(private http: HttpClient){}

    // Obtiene la lista de tipo de descuento
    getAll(): Observable<TipoIngreso[]>{
        return this.http.get<TipoIngreso[]>(this.url + '/tipo_ingreso/');
    }

    // Método que permite crear un nuevo tipo de descuento
    create(tipoingreso: TipoIngreso): Observable<TipoIngreso>{
        return this.http.post<TipoIngreso>(this.url + '/tipo_ingreso/', tipoingreso);
    }

    // Método que obtiene un solo tipo de descuento
    get(id: number): Observable<TipoIngreso>{
        return this.http.get<TipoIngreso>(this.url + '/tipo_ingreso/' + id);
    }

    // Método para actualizar tipo de descuento
    update(tipoingreso: TipoIngreso): Observable<TipoIngreso>{
        return this.http.put<TipoIngreso>(
            this.url + '/tipo_ingreso/' + tipoingreso.id_ingreso + '/', tipoingreso
        );
    }

    // Método para eliminar tipo de descuento
    delete(id: number): Observable<void>{
        return this.http.delete<void>(this.url + '/tipo_ingreso/' + id);
    }
}
