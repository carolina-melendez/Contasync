import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../../shared/Components/header/header.component";
import { Empleado } from '../../../core/models/Empleados';
import { empleadoService } from '../empleado.service';

@Component({
  selector: 'app-ver-empleado',
  standalone: true,
  templateUrl: './ver-empleado.component.html',
  styleUrls: ['./ver-empleado.component.css'],
  imports: [HeaderComponent,CommonModule]
})
export class VerEmpleadoComponent implements OnInit {
  empleado?: Empleado;

  constructor(
    private route: ActivatedRoute,
    private empleadoService: empleadoService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.empleadoService.get(+id).subscribe((empleado) => (this.empleado = empleado));
    }
  }
}
