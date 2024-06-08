import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthModule } from '../auth.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, AuthModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        console.log('Usuario autenticado', response);
        localStorage.setItem('token', response.access_token);
        this.router.navigate(['/dashboard']); // Redirige a la página de empleados después de iniciar sesión
      },
      error => {
        console.error('Error al iniciar sesión', error);
      }
    );
  }
}
