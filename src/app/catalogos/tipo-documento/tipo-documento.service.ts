import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TipoDocumento } from "../../core/models/TipoDocumento";

@Injectable({
    providedIn: 'root',
})
export class tipoDocumentoService{
    private url: string = ""; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de Tipo de documento
    getAll(): Observable<TipoDocumento[]>{
        return this.http.get<TipoDocumento[]>(this.url + '/tipo-documento/');
    }

    //método que permite crear un nuevo tipo de documento
    create(tipodocumento:TipoDocumento): Observable<TipoDocumento>{
        return this.http.put<TipoDocumento>(this.url + '/tipo-documento/', tipodocumento)
    };

    //método que obtiene un solo tipo de documento
    get(id: number): Observable<TipoDocumento>{
        return this.http.get<TipoDocumento>(this.url + '/tipo-documento/' + id);
    }

    //método para actualizar tipo de documento
    update(tipodocumento: TipoDocumento): Observable<TipoDocumento>{
        return this.http.put<TipoDocumento>(
            this.url + '/tipo-documento/' + tipodocumento.codigo_tipo_documento + '/', tipodocumento
        );
    }

    //método para eliminar tipo de documento
    delete(id?:number): Observable<TipoDocumento>{
        return this.http.delete<TipoDocumento>(this.url + '/tipo-documento/' + id);
    }
}