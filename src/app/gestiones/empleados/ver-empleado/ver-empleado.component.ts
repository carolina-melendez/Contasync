import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../../shared/Components/header/header.component";
import { Empleado } from '../../../core/models/Empleados';
import { empleadoService } from '../empleado.service';
import { CargoService } from '../../../catalogos/cargo/cargo.service';
import { Cargo } from '../../../core/models/Cargo';
import { Profesion } from '../../../core/models/Profesion';
import { profesionService } from '../../../catalogos/profesion/profesion.service';
import { UnidadOrganizativa } from '../../../core/models/UnidadOrganizativa';
import { unidadService } from '../../unidad-organizativa/unidad-organizativa.service';
import { EstadoCivil } from '../../../core/models/EstadoCivil';
import { estadoCivilService } from '../../../catalogos/estado-civil/estado-civil.service';
import { Pais } from '../../../core/models/Pais';
import { PaisService } from '../../../catalogos/pais/pais.service';
import { Municipio } from '../../../core/models/Municipio';
import { municipioService } from '../../../catalogos/municipio/municipio.service';
import { Departamento } from '../../../core/models/Departamento';
import { departamentoService } from '../../../catalogos/departamento/departamento.service';

@Component({
  selector: 'app-ver-empleado',
  standalone: true,
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css'],
  imports: [HeaderComponent, CommonModule]
})
export class VerEmpleadoComponent implements OnInit {
  empleado?: Empleado;
  cargos: Cargo[] = [];
  profesiones: Profesion[] = [];
  unidades: UnidadOrganizativa[] = [];
  estado_civil: EstadoCivil[] = [];
  paises: Pais[] = [];
  departamentos: Departamento[] = [];
  municipios: Municipio[] = [];

  constructor(
    private route: ActivatedRoute,
    private empleadoService: empleadoService,
    private cargoService: CargoService,
    private profesionService: profesionService,
    private unidadService: unidadService,
    private estadoCivilService: estadoCivilService,
    private paisService: PaisService,
    private departamentoService: departamentoService,
    private municipioService: municipioService
  ) {}

  ngOnInit(): void {
    this.getCargos(); // Asegúrate de cargar los cargos primero
    this.getProfesiones();
    this.getUnidades();
    this.getEstadoCivil();
    this.getPaises();
    this.getDepartamentos();
    this.getMunicipios();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.empleadoService.get(+id).subscribe((empleado) => {
        this.empleado = empleado;
      });
    }
  }

  getCargos(): void {
    this.cargoService.getAll().subscribe((c) => {
      this.cargos = c;
    });
  }

  getCargoDescripcion(codigo?: number): string {
    if (codigo === undefined || this.cargos.length === 0) {
      return 'N/A';
    }
    const cargo = this.cargos.find(c => c.codigo_cargo === codigo);
    return cargo && cargo.cargo_descripcion ? cargo.cargo_descripcion : 'N/A';
  }

  getProfesiones(): void {
    this.profesionService.getAll().subscribe((c) => {
      this.profesiones = c;
    });
  }

  getProfesionDescripcion(id_profesion?: number): string {
    if (id_profesion === undefined || this.profesiones.length === 0) {
      return 'N/A';
    }
    const profesion = this.profesiones.find(c => c.id_profesion === id_profesion);
    return profesion && profesion.descripcion ? profesion.descripcion : 'N/A';
  }

  getUnidades(): void {
    this.unidadService.getAll().subscribe((c) => {
      this.unidades = c;
    });
  }

  getUnidadDescripcion(codigo_unidad?: number): string {
    if (codigo_unidad === undefined || this.unidades.length === 0) {
      return 'N/A';
    }
    const unidad = this.unidades.find(c => c.codigo_unidad === codigo_unidad);
    return unidad && unidad.nombre_unidad ? unidad.nombre_unidad: 'N/A';
  }

  getEstadoCivil(): void {
    this.estadoCivilService.getAll().subscribe((c) => {
      this.estado_civil = c;
    });
  }

  getEstadoCivilDescripcion(id_estado_civil?: number): string {
    if (id_estado_civil === undefined || this.estado_civil.length === 0) {
      return 'N/A';
    }
    const estado_civil = this.estado_civil.find(c => c.id_estado_civil === id_estado_civil);
    return estado_civil && estado_civil.descripcion ? estado_civil.descripcion: 'N/A';
  }

  getPaises(): void {
    this.paisService.getAll().subscribe((c) => {
      this.paises = c;
    });
  }

  getDepartamentos(): void {
    this.departamentoService.getAll().subscribe((c) => {
      this.departamentos = c;
    });
  }

  getMunicipios(): void {
    this.municipioService.getAll().subscribe((c) => {
      this.municipios = c;
    });
  }
  getPaisDescripcion(codigo_pais?: number): string {
    if (codigo_pais === undefined || this.paises.length === 0) {
      return 'N/A';
    }
    const pais = this.paises.find(p => p.id === codigo_pais);
    return pais && pais.nombre ? pais.nombre: 'N/A';
  }

  getDepartamentoDescripcion(id?: number): string {
    if (id === undefined || this.departamentos.length === 0) {
      return 'N/A';
    }
    const departamento = this.departamentos.find(d => d.id === id);
    return departamento && departamento.nombre ? departamento.nombre: 'N/A';
  }

  getMunicipioDescripcion(id?: number): string {
    if (id === undefined || this.municipios.length === 0) {
      return 'N/A';
    }
    const municipio = this.municipios.find(m => m.id === id);
    return municipio && municipio.nombre ? municipio.nombre : 'N/A';
  }

  getDireccionCompleta(): string {
    if (!this.empleado) {
      return 'N/A';
    }
    const paisDescripcion = this.getPaisDescripcion(this.empleado.pais_direccion_id);
    const departamentoDescripcion = this.getDepartamentoDescripcion(this.empleado.departamento_id);
    const municipioDescripcion = this.getMunicipioDescripcion(this.empleado.municipio_id);
    return `${this.empleado.direccion}, ${municipioDescripcion}, ${departamentoDescripcion}, ${paisDescripcion}`;
  }

}
