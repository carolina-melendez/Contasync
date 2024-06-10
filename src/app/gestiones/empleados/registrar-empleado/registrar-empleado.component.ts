import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { empleadoService } from '../empleado.service';
import { HeaderComponent } from "../../../shared/Components/header/header.component";
import { PaisService } from '../../../catalogos/pais/pais.service';
import { departamentoService } from '../../../catalogos/departamento/departamento.service';
import { municipioService } from '../../../catalogos/municipio/municipio.service';
import { estadoCivilService } from '../../../catalogos/estado-civil/estado-civil.service';
import { profesionService } from '../../../catalogos/profesion/profesion.service';
import { CargoService } from '../../../catalogos/cargo/cargo.service';
import { unidadService } from '../../unidad-organizativa/unidad-organizativa.service';
import { Pais } from '../../../core/models/Pais';
import { Departamento } from '../../../core/models/Departamento';
import { Municipio } from '../../../core/models/Municipio';
import { EstadoCivil } from '../../../core/models/EstadoCivil';
import { Profesion } from '../../../core/models/Profesion';
import { Cargo } from '../../../core/models/Cargo';
import { UnidadOrganizativa } from '../../../core/models/UnidadOrganizativa';
import { TipoDocumento } from '../../../core/models/TipoDocumento';
import { tipoDocumentoService } from '../../../catalogos/tipo-documento/tipo-documento.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-empleado',
  standalone: true,
  templateUrl: './registrar-empleado.component.html',
  styleUrls: ['./registrar-empleado.component.css'],
  imports: [HeaderComponent, CommonModule, FormsModule]
})
export class RegistrarEmpleadoComponent implements OnInit {
  paises: Pais[] = [];
  departamentos: Departamento[] = [];
  municipios: Municipio[] = [];
  estadoCivil: EstadoCivil[] = [];
  profesiones: Profesion[] = [];
  cargos: Cargo[] = [];
  unidades: UnidadOrganizativa[] = [];
  tipoDocumentos: TipoDocumento[] = [];

  empleado: any = {}; // Objeto para almacenar los datos del empleado

  constructor(
    private paisService: PaisService,
    private departamentoService: departamentoService,
    private municipioService: municipioService,
    private estadoCivilService: estadoCivilService,
    private profesionService: profesionService,
    private cargoService: CargoService,
    private unidadService: unidadService,
    private tipoDocumentoService: tipoDocumentoService,
    private empleadoService: empleadoService
  ) {}

  ngOnInit(): void {
    this.loadPaises();
    this.loadDepartamentos();
    this.loadMunicipios();
    this.loadEstadoCivil();
    this.loadProfesiones();
    this.loadCargos();
    this.loadUnidades();
    this.loadTipoDocumento();
  }

  loadPaises(): void {
    this.paisService.getAll().subscribe((paises) => {
      this.paises = paises;
    });
  }

  loadTipoDocumento(): void {
    this.tipoDocumentoService.getAll().subscribe((tiposDocumentos) => {
      this.tipoDocumentos = tiposDocumentos;
    });
  }

  loadDepartamentos(): void {
    this.departamentoService.getAll().subscribe((departamentos) => {
      this.departamentos = departamentos;
    });
  }

  loadMunicipios(): void {
    this.municipioService.getAll().subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  loadEstadoCivil(): void {
    this.estadoCivilService.getAll().subscribe((estadoCivil) => {
      this.estadoCivil = estadoCivil;
    });
  }

  loadProfesiones(): void {
    this.profesionService.getAll().subscribe((profesiones) => {
      this.profesiones = profesiones;
    });
  }

  loadCargos(): void {
    this.cargoService.getAll().subscribe((cargos) => {
      this.cargos = cargos;
    });
  }

  loadUnidades(): void {
    this.unidadService.getAll().subscribe((unidades) => {
      this.unidades = unidades;
    });
  }

  registrarEmpleado(): void {
    this.empleadoService.create(this.empleado).subscribe({
      next: () => {
        swal.fire({
          icon: 'success',
          title: 'Empleado registrado',
          text: 'El empleado ha sido registrado exitosamente',
        }).then(() => {
          window.location.href = 'http://localhost:4200/empleados/';
        });
      },
      error: (err: any) => {
        swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar el empleado: ' + err.message,
        });
      },
    });
  }
  

}
