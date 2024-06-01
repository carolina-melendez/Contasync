import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Profesion } from "../../core/models/Profesion";

@Injectable({
    providedIn: 'root',
})
export class profesionService{
    private url: string = "http://127.0.0.1:8000/api"; 

    constructor(private http: HttpClient){}

    getAll(): Observable<Profesion[]>{
        return this.http.get<Profesion[]>(this.url + '/profesion/');
    }

    create(profesion:Profesion): Observable<Profesion>{
        return this.http.post<Profesion>(this.url + '/profesion/', profesion)
    }

    get(id: number): Observable<Profesion>{
        return this.http.get<Profesion>(this.url + '/profesion/' + id);
    }

    update(profesion: Profesion): Observable<Profesion>{
        return this.http.put<Profesion>(this.url + '/profesion/' + profesion.id_profesion, profesion);
    }

    delete(id?:number): Observable<Profesion>{
        return this.http.delete<Profesion>(this.url + '/profesion/' + id);
    }
}
