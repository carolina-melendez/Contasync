import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CargoComponent } from '../../catalogos/cargo/cargo.component';
import { DepartamentoComponent } from '../../catalogos/departamento/departamento.component';
import { EstadoCivilComponent } from '../../catalogos/estado-civil/estado-civil.component';
import { MunicipioComponent } from '../../catalogos/municipio/municipio.component';
import { PaisComponent } from '../../catalogos/pais/pais.component';
import { ProfesionComponent } from '../../catalogos/profesion/profesion.component';
import { Cargo } from '../../core/models/Cargo';
import { Departamento } from '../../core/models/Departamento';
import { Empleado } from '../../core/models/Empleados';
import { EstadoCivil } from '../../core/models/EstadoCivil';
import { Municipio } from '../../core/models/Municipio';
import { Pais } from '../../core/models/Pais';
import { Profesion } from '../../core/models/Profesion';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {
  empleados?: EmpleadosComponent[];
  cargo?:CargoComponent[];
  estado_civil?:EstadoCivilComponent[];
  pais?: PaisComponent[];
  departamento?: DepartamentoComponent[];
  profesion?: ProfesionComponent[];
  municipio?: MunicipioComponent[];
  filterEmpleado = '';
}
