import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { estadoCivilService } from './estado-civil.service';
import { EstadoCivil } from '../../core/models/EstadoCivil';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class EstadoCivilComponent implements OnInit {
  @ViewChild('estadoCivilModal') estadoCivilModal!: ElementRef;
  estadosCiviles: EstadoCivil[] = [];
  estadoCivilForm: FormGroup;
  isEditMode = false;
  currentEstadoCivilId: number | null = null;

  constructor(private estadoCivilService: estadoCivilService, private fb: FormBuilder) {
    this.estadoCivilForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadEstadosCiviles();
  }

  loadEstadosCiviles() {
    this.estadoCivilService.getAll().subscribe((data: EstadoCivil[]) => {
      this.estadosCiviles = data;
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.estadoCivilForm.reset();
    this.showModal();
  }

  openEditModal(estadoCivil: EstadoCivil) {
    this.isEditMode = true;
    if (estadoCivil.id_estado_civil !== undefined) {
      this.currentEstadoCivilId = estadoCivil.id_estado_civil;
    }
    this.estadoCivilForm.patchValue(estadoCivil);
    this.showModal();
  }

  saveEstadoCivil() {
    if (this.estadoCivilForm.invalid) {
      return;
    }

    const estadoCivilData = this.estadoCivilForm.value;

    if (this.isEditMode && this.currentEstadoCivilId !== null) {
      this.estadoCivilService.update({ ...estadoCivilData, id_estado_civil: this.currentEstadoCivilId }).subscribe(() => {
        this.showSuccessAlert('Estado Civil actualizado correctamente');
        this.loadEstadosCiviles();
        this.hideModal();
      });
    } else {
      this.estadoCivilService.create(estadoCivilData).subscribe(() => {
        this.showSuccessAlert('Estado Civil creado correctamente');
        this.loadEstadosCiviles();
        this.hideModal();
      });
    }
  }

  confirmDelete(id_estado_civil: number) {
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
        this.estadoCivilService.delete(id_estado_civil).subscribe(() => {
          this.showSuccessAlert('Estado Civil eliminado correctamente');
          this.loadEstadosCiviles();
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
    this.estadoCivilModal.nativeElement.classList.add('show');
    this.estadoCivilModal.nativeElement.style.display = 'block';
    this.estadoCivilModal.nativeElement.setAttribute('aria-modal', 'true');
    this.estadoCivilModal.nativeElement.setAttribute('role', 'dialog');
  }

  hideModal() {
    this.estadoCivilModal.nativeElement.classList.remove('show');
    this.estadoCivilModal.nativeElement.style.display = 'none';
    this.estadoCivilModal.nativeElement.removeAttribute('aria-modal');
    this.estadoCivilModal.nativeElement.removeAttribute('role');
  }
}
