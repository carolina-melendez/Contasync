import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Departamento } from "../../core/models/Departamento";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class departamentoService{
    private url: string=environment.apiUrl //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de departamentos de la base
    getAll(): Observable<Departamento[]>{
        return this.http.get<Departamento[]>(this.url + '/departamento/');
    }

    //método que permite crear un nuevo departamento
    create(departamento:Departamento): Observable<Departamento>{
        return this.http.put<Departamento>(this.url + '/departamento/', departamento);
    }

    //método que obtiene un solo departamento
    get(id: number): Observable<Departamento>{
        return this.http.get<Departamento>(this.url + '/departamento/' + id);
    }

    //método para actualizar departamento
    update(departamento:Departamento): Observable<Departamento>{
        return this.http.put<Departamento>(
            this.url + '/departamento/' + departamento.id + '/', departamento
        );
    }

    //método para eliminar departamento
    delete(id?: number): Observable<Departamento>{
        return this.http.delete<Departamento>(this.url + '/departamento' + id);
    }
}