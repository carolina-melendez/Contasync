import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pais } from "../../core/models/Pais";

@Injectable({
    providedIn: 'root',
})
export class paisService{
    private url: string = ""; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de pais
    getAll(): Observable<Pais[]>{
        return this.http.get<Pais[]>(this.url + '/pais/');
    }

    //método que permite crear un nuevo pais
    create(pais:Pais): Observable<Pais>{
        return this.http.put<Pais>(this.url + '/pais/', pais)
    };

    //método que obtiene un solo pais
    get(id: number): Observable<Pais>{
        return this.http.get<Pais>(this.url + '/pais/' + id);
    }

    //método para actualizar pais
    update(pais: Pais): Observable<Pais>{
        return this.http.put<Pais>(
            this.url + '/pais/' + pais.codigo_pais + '/', pais
        );
    }

    //método para eliminar pais
    delete(id?:number): Observable<Pais>{
        return this.http.delete<Pais>(this.url + '/pais/' + id);
    }
}