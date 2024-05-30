import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Cargo } from "../../core/models/Cargo";


@Injectable({
    providedIn: 'root',
})
export class cargoService{
    private url: string="" //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtenemos la lista de cargos de la base
    getAll(): Observable<Cargo[]>{
        return this.http.get<Cargo[]>(this.url + '/cargo/');
    }

    //método que permitre crear un nuevo cargo
    create(cargo:Cargo): Observable<Cargo>{
        return this.http.put<Cargo>(this.url + '/cargo/', cargo);
    }

    //método que obtiene un solo cargo
    get(id:number): Observable<Cargo>{
        return this.http.get<Cargo>(this.url + '/cargo' + id);
    }

    //método para actualizar cargo
    update(cargo: Cargo): Observable<Cargo>{
        return this.http.put<Cargo>(
            this.url + '/cargo/' + cargo.codigo_cargo + '/', cargo
        );
    }

    //método para eliminar cargo
    delete(id?: number): Observable<Cargo>{
        return this.http.delete<Cargo>(this.url + '/cargo/' + id);
    }

}