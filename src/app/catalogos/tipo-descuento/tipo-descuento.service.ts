import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoDescuento } from "../../core/models/TipoDescuento";
import { environment } from "../../../environments/environment.prod";

@Injectable({
    providedIn: 'root',
})
export class TipoDescuentoService{
    private url: string = environment.apiUrl;

    constructor(private http: HttpClient){}

    // Obtiene la lista de tipo de descuento
    getAll(): Observable<TipoDescuento[]>{
        return this.http.get<TipoDescuento[]>(this.url + '/tipo_descuento/');
    }

    // Método que permite crear un nuevo tipo de descuento
    create(tipodescuento: TipoDescuento): Observable<TipoDescuento>{
        return this.http.post<TipoDescuento>(this.url + '/tipo_descuento/', tipodescuento);
    }

    // Método que obtiene un solo tipo de descuento
    get(id: number): Observable<TipoDescuento>{
        return this.http.get<TipoDescuento>(this.url + '/tipo_descuento/' + id);
    }

    // Método para actualizar tipo de descuento
    update(tipodescuento: TipoDescuento): Observable<TipoDescuento>{
        return this.http.put<TipoDescuento>(
            this.url + '/tipo_descuento/' + tipodescuento.id_descuento + '/', tipodescuento
        );
    }

    // Método para eliminar tipo de descuento
    delete(id: number): Observable<void>{
        return this.http.delete<void>(this.url + '/tipo_descuento/' + id);
    }
}
