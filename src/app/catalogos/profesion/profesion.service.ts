import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Profesion } from "../../core/models/Profesion";

@Injectable({
    providedIn: 'root',
})
export class profesionService{
    private url: string = ""; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de profesion
    getAll(): Observable<Profesion[]>{
        return this.http.get<Profesion[]>(this.url + '/profesion/');
    }

    //método que permite crear un nuevo profesion
    create(profesion:Profesion): Observable<Profesion>{
        return this.http.put<Profesion>(this.url + '/profesion/', profesion)
    };

    //método que obtiene un solo profesion
    get(id: number): Observable<Profesion>{
        return this.http.get<Profesion>(this.url + '/profesion/' + id);
    }

    //método para actualizar profesion
    update(profesion: Profesion): Observable<Profesion>{
        return this.http.put<Profesion>(
            this.url + '/profesion/' + profesion.codigo_profesion + '/', profesion
        );
    }

    //método para eliminar profesion
    delete(id?:number): Observable<Profesion>{
        return this.http.delete<Profesion>(this.url + '/profesion/' + id);
    }
}