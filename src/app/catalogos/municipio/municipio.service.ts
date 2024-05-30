import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Municipio } from "../../core/models/Municipio";


@Injectable({
    providedIn: 'root',
})
export class municipioService{
    private url: string = ""; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de municipio
    getAll(): Observable<Municipio[]>{
        return this.http.get<Municipio[]>(this.url + '/municipio/');
    }

    //método que permite crear un nuevo municipio
    create(municipio:Municipio): Observable<Municipio>{
        return this.http.put<Municipio>(this.url + '/municipio/', municipio)
    };

    //método que obtiene un solo municipio
    get(id: number): Observable<Municipio>{
        return this.http.get<Municipio>(this.url + '/municipio/' + id);
    }

    //método para actualizar municipio
    update(municipio: Municipio): Observable<Municipio>{
        return this.http.put<Municipio>(
            this.url + '/municipio/' + municipio.codigo_municipio + '/', municipio
        );
    }

    //método para eliminar municipio
    delete(id?:number): Observable<Municipio>{
        return this.http.delete<Municipio>(this.url + '/municipio/' + id);
    }
}