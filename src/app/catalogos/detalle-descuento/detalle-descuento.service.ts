import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, ObservedValueOf } from "rxjs";
import { DetalleDescuento } from "../../core/models/DetalleDescuento";


@Injectable({
    providedIn: 'root',
})
export class detalleDescuentoService{
    private url: string= ""; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //obtiene la lista de detalle de descuento
    getAll(): Observable<DetalleDescuento[]>{
        return this.http.get<DetalleDescuento[]>(this.url + '/detalle-descuento');
    }

    //método que permite crear nuevo detalle de descuento
    create(detalledescuento:DetalleDescuento): Observable<DetalleDescuento>{
        return this.http.put<DetalleDescuento>(this.url + '/detalle-descuento/', detalledescuento);
    }

    //método que obtiene un solo detalle de descuento
    get(id: number): Observable<DetalleDescuento>{
        return this.http.get<DetalleDescuento>(this.url + '/detalle-descuento' + id);
    }

    //método para actualizar el detalle de descuento
    update(detalledescuento:DetalleDescuento): Observable<DetalleDescuento>{
        return this.http.put<DetalleDescuento>(
            this.url + '/detalle-descuento' + detalledescuento.codigo_tipoDescuento + '/', detalledescuento
        );
    }

    delete(id?: number): Observable<DetalleDescuento>{
        return this.http.delete<DetalleDescuento>(this.url + '/detalle-descuento' + id);
    }
}