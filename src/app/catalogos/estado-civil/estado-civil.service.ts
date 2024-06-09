import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EstadoCivil } from "../../core/models/EstadoCivil";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod";


@Injectable({
    providedIn: 'root',
})
export class estadoCivilService{
    private url: string = environment.apiUrl;

    constructor(private http: HttpClient){}

    //Obtiene la lista de estado civil
    getAll(): Observable<EstadoCivil[]>{
        return this.http.get<EstadoCivil[]>(this.url + '/estados_civiles/');
    }

    //método que permite crear un nuevo estado civil
    create(estadocivil:EstadoCivil): Observable<EstadoCivil>{
        return this.http.post<EstadoCivil>(this.url + '/estados_civiles/', estadocivil)
    };

    //método que obtiene un solo estado civil
    get(id: number): Observable<EstadoCivil>{
        return this.http.get<EstadoCivil>(this.url + '/estados_civiles/' + id);
    }

    //método para actualizar estado civil
    update(estadocivil: EstadoCivil): Observable<EstadoCivil>{
        return this.http.put<EstadoCivil>(
            this.url + '/estados_civiles/' + estadocivil.id_estado_civil + '/', estadocivil
        );
    }

    //método para eliminar estado civil
    delete(id?:number): Observable<EstadoCivil>{
        return this.http.delete<EstadoCivil>(this.url + '/estados_civiles/' + id);
    }
}