import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Organizacion } from "../../core/models/Organizacion";
import { environment } from "../../../environments/environment.prod";

@Injectable({
    providedIn: 'root',
})
export class organizacionService{
    private url: string = environment.apiUrl; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de organizacion
    getAll(): Observable<Organizacion[]>{
        return this.http.get<Organizacion[]>(this.url + '/organizacion/');
    }

    //método que permite crear una nueva organizacion
    create(organizacion:Organizacion): Observable<Organizacion>{
        return this.http.put<Organizacion>(this.url + '/organizacion/', Organizacion)
    };

    //método que obtiene una sola organizacion
    get(id: number): Observable<Organizacion>{
        return this.http.get<Organizacion>(this.url + '/organizacion/' + id);
    }

    //método para actualizar organizacion
    update(organizacion: Organizacion): Observable<Organizacion>{
        return this.http.put<Organizacion>(
            this.url + '/organizacion/' + organizacion.codigo_organizacion + '/', organizacion
        );
    }

    //método para eliminar organizacion
    delete(id?:number): Observable<Organizacion>{
        return this.http.delete<Organizacion>(this.url + '/organizacion/' + id);
    }
}