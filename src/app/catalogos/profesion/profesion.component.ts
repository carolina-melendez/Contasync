import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { profesionService } from './profesion.service';
import { Profesion } from '../../core/models/Profesion';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profesion',
  templateUrl: './profesion.component.html',
  styleUrls: ['./profesion.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class ProfesionComponent implements OnInit {
  @ViewChild('profesionModal') profesionModal!: ElementRef;
  profesiones: Profesion[] = [];
  profesionForm: FormGroup;
  isEditMode = false;
  currentProfesionId: number | null = null;

  constructor(private profesionService: profesionService, private fb: FormBuilder) {
    this.profesionForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadProfesiones();
  }

  loadProfesiones() {
    this.profesionService.getAll().subscribe((data: Profesion[]) => {
      this.profesiones = data;
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.profesionForm.reset();
    this.showModal();
  }

  openEditModal(profesion: Profesion) {
    this.isEditMode = true;
    if (profesion.id_profesion !== undefined) {
      this.currentProfesionId = profesion.id_profesion;
    }
    this.profesionForm.patchValue(profesion);
    this.showModal();
  }

  saveProfesion() {
    if (this.profesionForm.invalid) {
      return;
    }

    const profesionData = this.profesionForm.value;

    if (this.isEditMode && this.currentProfesionId !== null) {
      this.profesionService.update({ ...profesionData, id_profesion: this.currentProfesionId }).subscribe(() => {
        this.showSuccessAlert('Profesión actualizada correctamente');
        this.loadProfesiones();
        this.hideModal();
      });
    } else {
      this.profesionService.create(profesionData).subscribe(() => {
        this.showSuccessAlert('Profesión creada correctamente');
        this.loadProfesiones();
        this.hideModal();
      });
    }
  }

  confirmDelete(id_profesion: number) {
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
        this.profesionService.delete(id_profesion).subscribe(() => {
          this.showSuccessAlert('Profesión eliminada correctamente');
          this.loadProfesiones();
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
    this.profesionModal.nativeElement.classList.add('show');
    this.profesionModal.nativeElement.style.display = 'block';
    this.profesionModal.nativeElement.setAttribute('aria-modal', 'true');
    this.profesionModal.nativeElement.setAttribute('role', 'dialog');
  }

  hideModal() {
    this.profesionModal.nativeElement.classList.remove('show');
    this.profesionModal.nativeElement.style.display = 'none';
    this.profesionModal.nativeElement.removeAttribute('aria-modal');
    this.profesionModal.nativeElement.removeAttribute('role');
  }
}
