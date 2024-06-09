import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from './usuario.service';
import { User } from '../../core/models/Usuario';
import { Rol } from '../../core/models/Rol';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class UsuarioComponent implements OnInit {
  @ViewChild('userModal') userModal!: ElementRef;
  users: User[] = [];
  roles: Rol[] = [];
  userForm: FormGroup;
  isEditMode = false;
  currentUserId: number | null = null;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.userService.getAll().subscribe((data: User[]) => {
      this.users = data;
    });
  }

  loadRoles() {
    this.userService.getRoles().subscribe((data: any) => {
      this.roles = data.roles; 
    });
  }

  openCreateModal() {
    console.log('Opening create modal. Current roles:', this.roles); // Verificar los roles antes de abrir el modal
    this.isEditMode = false;
    this.userForm.reset();
    this.showModal();
  }

  openEditModal(user: User) {
    this.isEditMode = true;
    if (user.id !== undefined) {
      this.currentUserId = user.id;
    }
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      password: '', // No mostrar la contraseña
      role: user.roles && user.roles.length > 0 ? user.roles[0].id : ''
    });
    console.log('Opening edit modal. Current roles:', this.roles); // Verificar los roles antes de abrir el modal
    this.showModal();
  }

  saveUser() {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;

    if (this.isEditMode && this.currentUserId !== null) {
      this.userService.update(this.currentUserId, userData).subscribe(() => {
        this.showSuccessAlert('Usuario actualizado correctamente');
        this.loadUsers();
        this.hideModal();
      });
    } else {
      this.userService.create(userData).subscribe(() => {
        this.showSuccessAlert('Usuario creado correctamente');
        this.loadUsers();
        this.hideModal();
      });
    }
  }

  confirmDelete(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(id).subscribe(() => {
          this.showSuccessAlert('Usuario eliminado correctamente');
          this.loadUsers();
        });
      }
    });
  }

  showSuccessAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
      timer: 2000,
      showConfirmButton: false
    });
  }

  showModal() {
    this.userModal.nativeElement.classList.add('show');
    this.userModal.nativeElement.style.display = 'block';
    this.userModal.nativeElement.setAttribute('aria-modal', 'true');
    this.userModal.nativeElement.setAttribute('role', 'dialog');
  }

  hideModal() {
    this.userModal.nativeElement.classList.remove('show');
    this.userModal.nativeElement.style.display = 'none';
    this.userModal.nativeElement.removeAttribute('aria-modal');
    this.userModal.nativeElement.removeAttribute('role');
  }
}
