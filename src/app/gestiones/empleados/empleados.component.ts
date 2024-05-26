import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/Components/header/header.component';

@Component({
  selector: 'app-empleados',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {

}
