import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EstadoCivil } from "../../core/models/EstadoCivil";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root',
})
export class estadoCivilService{
    private url: string = ""; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de estado civil
    getAll(): Observable<EstadoCivil[]>{
        return this.http.get<EstadoCivil[]>(this.url + '/estado-civil/');
    }

    //método que permite crear un nuevo estado civil
    create(estadocivil:EstadoCivil): Observable<EstadoCivil>{
        return this.http.put<EstadoCivil>(this.url + '/estado-civil/', estadocivil)
    };

    //método que obtiene un solo estado civil
    get(id: number): Observable<EstadoCivil>{
        return this.http.get<EstadoCivil>(this.url + '/estado-civil/' + id);
    }

    //método para actualizar estado civil
    update(estadocivil: EstadoCivil): Observable<EstadoCivil>{
        return this.http.put<EstadoCivil>(
            this.url + '/estado-civil/' + estadocivil.codigo_estado_civil + '/', estadocivil
        );
    }

    //método para eliminar estado civil
    delete(id?:number): Observable<EstadoCivil>{
        return this.http.delete<EstadoCivil>(this.url + '/estado-civil/' + id);
    }
}