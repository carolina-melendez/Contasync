import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PaisService } from './pais.service';
import { Pais } from '../../core/models/Pais';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class PaisComponent implements OnInit {
  @ViewChild('paisModal') paisModal!: ElementRef;
  paises: Pais[] = [];
  paisForm: FormGroup;
  isEditMode = false;
  currentPaisId: number | null = null;

  constructor(private paisService: PaisService, private fb: FormBuilder) {
    this.paisForm = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadPaises();
  }

  loadPaises() {
    this.paisService.getAll().subscribe((data: Pais[]) => {
      this.paises = data;
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.paisForm.reset();
    this.showModal();
  }

  openEditModal(pais: Pais) {
    this.isEditMode = true;
    if (pais.id !== undefined) {
      this.currentPaisId = pais.id;
    }
    this.paisForm.patchValue(pais);
    this.showModal();
  }

  savePais() {
    if (this.paisForm.invalid) {
      return;
    }

    const paisData = this.paisForm.value;

    if (this.isEditMode && this.currentPaisId !== null) {
      this.paisService.update({ ...paisData, id: this.currentPaisId }).subscribe(() => {
        this.showSuccessAlert('País actualizado correctamente');
        this.loadPaises();
        this.hideModal();
      });
    } else {
      this.paisService.create(paisData).subscribe(() => {
        this.showSuccessAlert('País creado correctamente');
        this.loadPaises();
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
        this.paisService.delete(id).subscribe(() => {
          this.showSuccessAlert('País eliminado correctamente');
          this.loadPaises();
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
    this.paisModal.nativeElement.classList.add('show');
    this.paisModal.nativeElement.style.display = 'block';
    this.paisModal.nativeElement.setAttribute('aria-modal', 'true');
    this.paisModal.nativeElement.setAttribute('role', 'dialog');
  }

  hideModal() {
    this.paisModal.nativeElement.classList.remove('show');
    this.paisModal.nativeElement.style.display = 'none';
    this.paisModal.nativeElement.removeAttribute('aria-modal');
    this.paisModal.nativeElement.removeAttribute('role');
  }
}
