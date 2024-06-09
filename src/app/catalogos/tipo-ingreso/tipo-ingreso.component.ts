import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoIngresoService } from './tipo-ingreso.service';
import { TipoIngreso } from '../../core/models/TipoIngreso';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-ingreso',
  templateUrl: './tipo-ingreso.component.html',
  styleUrls: ['./tipo-ingreso.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class TipoIngresoComponent implements OnInit {
  @ViewChild('tipoIngresoModal') tipoIngresoModal!: ElementRef;
  tipoIngresos: TipoIngreso[] = [];
  tipoIngresosForm: FormGroup;
  isEditMode = false;
  currentTipoIngresoId: number | null = null;

  constructor(private tipoIngresoService: TipoIngresoService, private fb: FormBuilder) {
    this.tipoIngresosForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTipoIngresos();
  }

  loadTipoIngresos() {
    this.tipoIngresoService.getAll().subscribe((data: TipoIngreso[]) => {
      this.tipoIngresos = data;
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.tipoIngresosForm.reset();
    this.showModal();
  }

  openEditModal(tipoIngresos: TipoIngreso) {
    this.isEditMode = true;
    if (tipoIngresos.id_ingreso !== undefined) {
      this.currentTipoIngresoId = tipoIngresos.id_ingreso;
    }
    this.tipoIngresosForm.patchValue(tipoIngresos);
    this.showModal();
  }

  saveTipoIngreso() {
    if (this.tipoIngresosForm.invalid) {
      return;
    }

    const tipoIngresoData = this.tipoIngresosForm.value;

    if (this.isEditMode && this.currentTipoIngresoId !== null) {
      this.tipoIngresoService.update({ ...tipoIngresoData, id_ingreso: this.currentTipoIngresoId }).subscribe(() => {
        this.showSuccessAlert('Tipo de ingreso actualizado correctamente');
        this.loadTipoIngresos();
        this.hideModal();
      });
    } else {
      this.tipoIngresoService.create(tipoIngresoData).subscribe(() => {
        this.showSuccessAlert('Tipo de ingreso creado correctamente');
        this.loadTipoIngresos();
        this.hideModal();
      });
    }
  }

  confirmDelete(id_ingreso: number) {
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
        this.tipoIngresoService.delete(id_ingreso).subscribe(() => {
          this.showSuccessAlert('Tipo de ingreso eliminado correctamente');
          this.loadTipoIngresos();
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
    this.tipoIngresoModal.nativeElement.classList.add('show');
    this.tipoIngresoModal.nativeElement.style.display = 'block';
    this.tipoIngresoModal.nativeElement.setAttribute('aria-modal', 'true');
    this.tipoIngresoModal.nativeElement.setAttribute('role', 'dialog');
  }

  hideModal() {
    this.tipoIngresoModal.nativeElement.classList.remove('show');
    this.tipoIngresoModal.nativeElement.style.display = 'none';
    this.tipoIngresoModal.nativeElement.removeAttribute('aria-modal');
    this.tipoIngresoModal.nativeElement.removeAttribute('role');
  }
}
