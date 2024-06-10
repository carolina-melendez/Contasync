import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Presupuesto } from "../../core/models/Presupuesto";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class presupuestoService{
    private url: string = environment.apiUrl; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de presupuesto
    getAll(): Observable<Presupuesto[]>{
        return this.http.get<Presupuesto[]>(this.url + '/presupuesto_unidad/');
    }

    //método que permite crear un nuevo presupuesto
    create(presupuesto:Presupuesto): Observable<Presupuesto>{
        return this.http.put<Presupuesto>(this.url + '/presupuesto_unidad/', presupuesto)
    };

    //método que obtiene un solo presupuesto
    get(id: number): Observable<Presupuesto>{
        return this.http.get<Presupuesto>(this.url + '/presupuesto_unidad/' + id);
    }

    //método para actualizar presupuesto
    update(presupuesto: Presupuesto): Observable<Presupuesto>{
        return this.http.put<Presupuesto>(
            this.url + '/presupuesto_unidad/' + presupuesto.codig_presupuestario + '/', presupuesto
        );
    }

    //método para eliminar presupuesto
    delete(id?:number): Observable<Presupuesto>{
        return this.http.delete<Presupuesto>(this.url + '/presupuesto_unidad/' + id);
    }
}