import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoDescuento } from "../../core/models/TipoDescuento";

@Injectable({
    providedIn: 'root',
})
export class tipoDescuentoService{
    private url: string = ""; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de tipo de descuento
    getAll(): Observable<TipoDescuento[]>{
        return this.http.get<TipoDescuento[]>(this.url + '/tipo-descuento/');
    }

    //método que permite crear un nuevo tipo de descuento
    create(tipodescuento:TipoDescuento): Observable<TipoDescuento>{
        return this.http.put<TipoDescuento>(this.url + '/tipo-descuento/', tipodescuento)
    };

    //método que obtiene un solo tipo de descuento
    get(id: number): Observable<TipoDescuento>{
        return this.http.get<TipoDescuento>(this.url + '/tipo-descuento/' + id);
    }

    //método para actualizar tipo de descuento
    update(tipodescuento: TipoDescuento): Observable<TipoDescuento>{
        return this.http.put<TipoDescuento>(
            this.url + '/tipo-descuento/' + tipodescuento.codigo_tipoDescuento + '/', tipodescuento
        );
    }

    //método para eliminar tipo de descuento
    delete(id?:number): Observable<TipoDescuento>{
        return this.http.delete<TipoDescuento>(this.url + '/tipo-descuento/' + id);
    }
}