import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CargoService } from '../../catalogos/cargo/cargo.service';
import { Cargo } from '../../core/models/Cargo';
import { Empleado } from '../../core/models/Empleados';
import swal from 'sweetalert2';
import { empleadoService } from './empleado.service';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [CommonModule, HeaderComponent], // Agregar CommonModule a imports
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {
  titulo: string = 'Lista de Empleados';
  empleados?: Empleado[];
  cargos: Cargo[] = [];
  filterEmpleado = '';

  constructor(
    private empleadoService: empleadoService,
    private cargoService: CargoService
  ) {}

  ngOnInit(): void {
    this.empleadoService.getAll().subscribe((e) => (this.empleados = e));
    this.getCargos();
  }

  delete(empleado: Empleado): void {
    swal
      .fire({
        title: '¿Desea eliminar este registro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.empleadoService
            .delete(empleado.codigo_empleado)
            .subscribe(() =>
              this.empleadoService
                .getAll()
                .subscribe((response) => (this.empleados = response))
            );
          swal.fire('Eliminado!', 'Empleado Eliminado', 'success');
        }
      });
  }

  getCargos(): void {
    this.cargoService.getAll().subscribe((c) => (this.cargos = c));
  }

  getCargoDescripcion(codigo?: number): string {
    if (codigo === undefined) {
      return 'N/A';
    }
    const cargo = this.cargos?.find(c => c.codigo_cargo === codigo);
    return cargo && cargo.cargo_descripcion ? cargo.cargo_descripcion : 'N/A';
  }

  getNombreCompleto(empleado: Empleado): string {
    const primerNombre = empleado.primer_nombre || '';
    const segundoNombre = empleado.segundo_nombre || '';
    const tercerNombre = empleado.tercer_nombre || '';
    
    return `${primerNombre} ${segundoNombre} ${tercerNombre}`.trim();
  }

  getApellidoCompleto(empleado: Empleado): string {
    const apellidoPaterno = empleado.apellido_paterno || '';
    const apellidoMaterno = empleado.apellido_materno || '';
    
    return `${apellidoPaterno} ${apellidoMaterno}`.trim();
  }
}
