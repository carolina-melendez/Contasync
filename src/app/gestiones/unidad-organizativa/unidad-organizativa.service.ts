import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UnidadOrganizativa } from "../../core/models/UnidadOrganizativa";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment.prod";


@Injectable({
    providedIn: 'root'
})
export class unidadService{
    private url: string = environment.apiUrl; //aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de las unidades
    getAll(): Observable<UnidadOrganizativa[]>{
        return this.http.get<UnidadOrganizativa[]>(this.url + '/unidad/');
    }

    //método que permite crear un nuevo estado civil
    create(unidad_organizativa:UnidadOrganizativa): Observable<UnidadOrganizativa>{
        return this.http.post<UnidadOrganizativa>(this.url + '/unidad/', unidad_organizativa)
    };

    //método para obtener una sola unidad
    get(id: number): Observable<UnidadOrganizativa>{
        return this.http.get<UnidadOrganizativa>(this.url + '/unidad/' + id);
    }

    //método para actualizar la unidad organizativa
    update(unidad_organizativa: UnidadOrganizativa): Observable<UnidadOrganizativa>{
        return this.http.put<UnidadOrganizativa>(
            this.url + '/unidad/' + unidad_organizativa.codigo_unidad + '/', unidad_organizativa
        );
    }

    //método para eliminar unidad organizativa
    delete(id?:number): Observable<UnidadOrganizativa>{
        return this.http.delete<UnidadOrganizativa>(this.url + '/unidad/' + id);
    }
}
