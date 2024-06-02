import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoDescuentoService } from './tipo-descuento.service';
import { TipoDescuento } from '../../core/models/TipoDescuento';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-descuento',
  templateUrl: './tipo-descuento.component.html',
  styleUrls: ['./tipo-descuento.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class TipoDescuentoComponent implements OnInit {
  @ViewChild('tipoDescuentoModal') tipoDescuentoModal!: ElementRef;
  tipoDescuentos: TipoDescuento[] = [];
  tipoDescuentoForm: FormGroup;
  isEditMode = false;
  currentTipoDescuentoId: number | null = null;

  constructor(private tipoDescuentoService: TipoDescuentoService, private fb: FormBuilder) {
    this.tipoDescuentoForm = this.fb.group({
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTipoDescuentos();
  }

  loadTipoDescuentos() {
    this.tipoDescuentoService.getAll().subscribe((data: TipoDescuento[]) => {
      this.tipoDescuentos = data;
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.tipoDescuentoForm.reset();
    this.showModal();
  }

  openEditModal(tipoDescuento: TipoDescuento) {
    this.isEditMode = true;
    if (tipoDescuento.id_descuento !== undefined) {
      this.currentTipoDescuentoId = tipoDescuento.id_descuento;
    }
    this.tipoDescuentoForm.patchValue(tipoDescuento);
    this.showModal();
  }

  saveTipoDescuento() {
    if (this.tipoDescuentoForm.invalid) {
      return;
    }

    const tipoDescuentoData = this.tipoDescuentoForm.value;

    if (this.isEditMode && this.currentTipoDescuentoId !== null) {
      this.tipoDescuentoService.update({ ...tipoDescuentoData, id_descuento: this.currentTipoDescuentoId }).subscribe(() => {
        this.showSuccessAlert('Tipo de descuento actualizado correctamente');
        this.loadTipoDescuentos();
        this.hideModal();
      });
    } else {
      this.tipoDescuentoService.create(tipoDescuentoData).subscribe(() => {
        this.showSuccessAlert('Tipo de descuento creado correctamente');
        this.loadTipoDescuentos();
        this.hideModal();
      });
    }
  }

  confirmDelete(id_descuento: number) {
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
        this.tipoDescuentoService.delete(id_descuento).subscribe(() => {
          this.showSuccessAlert('Tipo de descuento eliminado correctamente');
          this.loadTipoDescuentos();
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
    this.tipoDescuentoModal.nativeElement.classList.add('show');
    this.tipoDescuentoModal.nativeElement.style.display = 'block';
    this.tipoDescuentoModal.nativeElement.setAttribute('aria-modal', 'true');
    this.tipoDescuentoModal.nativeElement.setAttribute('role', 'dialog');
  }

  hideModal() {
    this.tipoDescuentoModal.nativeElement.classList.remove('show');
    this.tipoDescuentoModal.nativeElement.style.display = 'none';
    this.tipoDescuentoModal.nativeElement.removeAttribute('aria-modal');
    this.tipoDescuentoModal.nativeElement.removeAttribute('role');
  }
}
