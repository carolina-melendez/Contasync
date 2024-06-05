import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UnidadOrganizativa } from '../../core/models/UnidadOrganizativa';
import { unidadService } from './unidad-organizativa.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-unidad-organizativa',
  standalone: true,
  imports: [HeaderComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './unidad-organizativa.component.html',
  styleUrl: './unidad-organizativa.component.css'
})
export class UnidadOrganizativaComponent implements OnInit {

  @ViewChild('unidadModal') unidadModal!: ElementRef;
  unidad: UnidadOrganizativa[] = [];
  unidadForm: FormGroup;
  isEditMode = false;
  currentUnidadId: number | null = null;

  constructor(private unidadservice: unidadService, private fb: FormBuilder) {
    this.unidadForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadUnidad();
  }

  loadUnidad() {
    this.unidadservice.getAll().subscribe((data: UnidadOrganizativa[]) => {
      this.unidad = data;
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.unidadForm.reset();
    this.showModal();
  }

  openEditModal(unidad: UnidadOrganizativa) {
    this.isEditMode = true;
    if (unidad.codigo_unidad_organizativa !== undefined) {
      this.currentUnidadId = unidad.codigo_unidad_organizativa;
    }
    this.unidadForm.patchValue(unidad);
    this.showModal();
  }

  saveUnidad() {
    if (this.unidadForm.invalid) {
      return;
    }

    const unidadData = this.unidadForm.value;

    if (this.isEditMode && this.currentUnidadId !== null) {
      this.unidadservice.update({ ...unidadData, codigo_unidad_organizativa: this.currentUnidadId }).subscribe(() => {
        this.showSuccessAlert('Unidad actualizada correctamente');
        this.loadUnidad();
        this.hideModal();
      });
    } else {
      this.unidadservice.create(unidadData).subscribe(() => {
        this.showSuccessAlert('Unidad creada correctamente');
        this.loadUnidad();
        this.hideModal();
      });
    }
  }

  confirmDelete(codigo_unidad_organizativa: number) {
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
        this.unidadservice.delete(codigo_unidad_organizativa).subscribe(() => {
          this.showSuccessAlert('Unidad eliminada correctamente');
          this.loadUnidad();
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
    this.unidadModal.nativeElement.classList.add('show');
    this.unidadModal.nativeElement.style.display = 'block';
    this.unidadModal.nativeElement.setAttribute('aria-modal', 'true');
    this.unidadModal.nativeElement.setAttribute('role', 'dialog');
  }

  hideModal() {
    this.unidadModal.nativeElement.classList.remove('show');
    this.unidadModal.nativeElement.style.display = 'none';
    this.unidadModal.nativeElement.removeAttribute('aria-modal');
    this.unidadModal.nativeElement.removeAttribute('role');
  }

}
