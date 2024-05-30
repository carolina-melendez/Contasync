import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Planilla } from "../../core/models/Planilla";

@Injectable({
    providedIn: 'root',
})
export class planillaService{
    private url: string = ""; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de planilla
    getAll(): Observable<Planilla[]>{
        return this.http.get<Planilla[]>(this.url + '/planilla/');
    }

    //método que permite crear una nueva planilla
    create(planilla:Planilla): Observable<Planilla>{
        return this.http.put<Planilla>(this.url + '/planilla/', planilla)
    };

    //método que obtiene una sola planilla
    get(id: number): Observable<Planilla>{
        return this.http.get<Planilla>(this.url + '/planilla/' + id);
    }

    //método para actualizar planilla
    update(planilla: Planilla): Observable<Planilla>{
        return this.http.put<Planilla>(
            this.url + '/planilla/' + planilla.codigo_planilla + '/', planilla
        );
    }

    //método para eliminar planilla
    delete(id?:number): Observable<Planilla>{
        return this.http.delete<Planilla>(this.url + '/planilla/' + id);
    }
}