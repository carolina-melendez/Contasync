import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email = '';
  newPassword = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.authService.resetPassword(this.email, this.newPassword).subscribe(
      response => {
        alert('Restablecimiento de contraseña exitoso');
        this.router.navigate(['/login']); 
      },
      error => {
        console.error('Error al restablecer la contraseña', error);
        alert('Error al restablecer la contraseña');
      }
    );
  }
}
