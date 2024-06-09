import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { RolService } from './roles.service';
import { Rol } from '../../../core/models/Rol';
import { HeaderComponent } from '../../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';
import { Permission } from '../../../core/models/Permission';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class RolesComponent implements OnInit {
  @ViewChild('rolModal') rolModal!: ElementRef;
  roles: Rol[] = [];
  rolForm: FormGroup;
  isEditMode = false;
  currentRolId: number | null = null;
  permissions: Permission[] = [];

  constructor(private rolService: RolService, private fb: FormBuilder) {
    this.rolForm = this.fb.group({
        name: ['', Validators.required],
        permission: this.fb.array([], Validators.required)
    });
}


  ngOnInit() {
    this.loadRoles();
    this.loadPermissions();
  }

  loadRoles() {
    this.rolService.getAll().subscribe((data: any) => {
      this.roles = data.roles; // Asigna directamente el array de roles
    });
  }
  


  loadPermissions() {
    this.rolService.getPermissions().subscribe((data: any) => {
        this.permissions = data.permissions;
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.rolForm.reset();
    this.showModal();
  }

  openEditModal(rol: Rol) {
    this.isEditMode = true;
    if (rol.id !== undefined) {
      this.currentRolId = rol.id;
    }
    this.rolForm.patchValue(rol);
    this.showModal();
  }

  saveRol() {
    if (this.rolForm.invalid) {
      return;
    }

    const rolData = this.rolForm.value;

    if (this.isEditMode && this.currentRolId !== null) {
      this.rolService.update({ ...rolData, id: this.currentRolId }).subscribe(() => {
        this.showSuccessAlert('Rol actualizado correctamente');
        this.loadRoles();
        this.hideModal();
      });
    } else {
      this.rolService.create(rolData).subscribe(() => {
        this.showSuccessAlert('Rol creado correctamente');
        this.loadRoles();
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
        this.rolService.delete(id).subscribe(() => {
          this.showSuccessAlert('Rol eliminado correctamente');
          this.loadRoles();
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
    this.rolModal.nativeElement.classList.add('show');
    this.rolModal.nativeElement.style.display = 'block';
    this.rolModal.nativeElement.setAttribute('aria-modal', 'true');
    this.rolModal.nativeElement.setAttribute('role', 'dialog');
  }

  hideModal() {
    this.rolModal.nativeElement.classList.remove('show');
    this.rolModal.nativeElement.style.display = 'none';
    this.rolModal.nativeElement.removeAttribute('aria-modal');
    this.rolModal.nativeElement.removeAttribute('role');
  }

  togglePermission(permissionName: string) {
    const permissions = this.rolForm.get('permission') as FormArray;

    if (permissions.value.includes(permissionName)) {
        const index = permissions.value.indexOf(permissionName);
        permissions.removeAt(index);
    } else {
        permissions.push(new FormControl(permissionName));
    }
}

}
