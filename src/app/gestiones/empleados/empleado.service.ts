import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../../core/models/Empleados';
import { Departamento } from '../../core/models/Departamento';
import { Cargo } from '../../core/models/Cargo';
import { EstadoCivil } from '../../core/models/EstadoCivil';
import { Pais } from '../../core/models/Pais';
import { Municipio } from '../../core/models/Municipio';
import { Profesion } from '../../core/models/Profesion';
import { environment } from "../../../environments/environment.prod";

@Injectable({
    providedIn: 'root',
})
export class empleadoService {
    private url: string=environment.apiUrl;; //Aqui va el url de la api

    constructor(private http: HttpClient){}

    //Obtiene la lista de empleados de la base
    getAll(): Observable<Empleado[]>{
        return this.http.get<Empleado[]>(this.url + '/empleado/');
    }

    //Método que permite crear nuevo empleado
    create(empleado:Empleado): Observable<Empleado>{
        return this.http.post<Empleado>(this.url + '/empleado/', empleado);
    }

    //método que obtiene un solo empleado
    get(id: number): Observable<Empleado>{
        return this.http.get<Empleado>(this.url +'/empleado/'+ id);
    }

    //método para actualizar empleado
    update(empleado: Empleado): Observable<Empleado>{
        return this.http.put<Empleado>(
            this.url + '/empleado/' + empleado.codigo_empleado + '/', empleado
        );
    }

    //método para eliminar empleado
    delete(id?: number): Observable<Empleado>{
        return this.http.delete<Empleado>(this.url + '/empleado/' + id);
    }

    //Obtener cargo
    getCargos(): Observable<Cargo[]>{
        return this.http.get<Cargo[]>(this.url + '/cargo/');
    }

    //Obtener estado civil
    getEstadoCivil():Observable<EstadoCivil[]>{
        return this.http.get<EstadoCivil[]>(this.url + '/estadocivil/');
    }

    //Obtener pais
    getPais():Observable<Pais[]>{
        return this.http.get<Pais[]>(this.url + '/pais/');
    } 

    //Obtener departamentos
    getDepartamentos(): Observable<Departamento[]>{
        return this.http.get<Departamento[]>(this.url + '/departamento/');
    }

    //Obtener municipios
    getMunicipios(): Observable<Municipio[]>{
        return this.http.get<Municipio[]>(this.url + '/municipio/');
    }
    
    //Obtener profesión
    getProfesion(): Observable<Profesion[]>{
        return this.http.get<Profesion[]>(this.url + '/profesion/');
    }

}