import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { TipoDocumento } from '../../core/models/TipoDocumento';
import { tipoDocumentoService } from './tipo-documento.service';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class TipoDocumentoComponent implements OnInit {
  @ViewChild('tipoDocumentoModal') tipoDocumentoModal!: ElementRef;
  tipoDocumentos: TipoDocumento[] = [];
  tipoDocumentoForm: FormGroup;
  isEditMode = false;
  currentTipoDocumentoId: number | null = null;

  constructor(private tipoDocumentoService: tipoDocumentoService, private fb: FormBuilder) {
    this.tipoDocumentoForm = this.fb.group({
      codigo: ['', [Validators.required, Validators.pattern('[A-Za-z0-9]{3}')]],
      nombre: ['', Validators.required]
    });
  }
  

  ngOnInit() {
    this.loadTipoDocumentos();
  }

  loadTipoDocumentos() {
    this.tipoDocumentoService.getAll().subscribe((data: TipoDocumento[]) => {
      this.tipoDocumentos = data;
    });
  }

  openCreateModal() {
    this.isEditMode = false;
    this.tipoDocumentoForm.reset();
    this.showModal();
  }

  openEditModal(tipoDocumento: TipoDocumento) {
    this.isEditMode = true;
    if (tipoDocumento.codigo !== undefined) {
      this.currentTipoDocumentoId = tipoDocumento.codigo;
    }
    this.tipoDocumentoForm.patchValue(tipoDocumento);
    this.showModal();
  }

  saveTipoDocumento() {
    if (this.tipoDocumentoForm.invalid) {
      return;
    }

    const tipoDocumentoData = this.tipoDocumentoForm.value;

    if (this.isEditMode && this.currentTipoDocumentoId !== null) {
      this.tipoDocumentoService.update({ ...tipoDocumentoData, codigo: this.currentTipoDocumentoId }).subscribe(() => {
        this.showSuccessAlert('Tipo de Documento actualizado correctamente');
        this.loadTipoDocumentos();
        this.hideModal();
      });
    }  else {
      console.log(tipoDocumentoData);
      this.tipoDocumentoService.create(tipoDocumentoData).subscribe(() => {
        this.showSuccessAlert('Tipo de Documento creado correctamente');
        this.loadTipoDocumentos();
        this.hideModal();
      });
    }
  }

  confirmDelete(codigo: number) {
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
        this.tipoDocumentoService.delete(codigo).subscribe(() => {
          this.showSuccessAlert('Tipo de Documento eliminado correctamente');
          this.loadTipoDocumentos();
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
    this.tipoDocumentoModal.nativeElement.classList.add('show');
    this.tipoDocumentoModal.nativeElement.style.display = 'block';
    this.tipoDocumentoModal.nativeElement.setAttribute('aria-modal', 'true');
    this.tipoDocumentoModal.nativeElement.setAttribute('role', 'dialog');
  }

  hideModal() {
    this.tipoDocumentoModal.nativeElement.classList.remove('show');
    this.tipoDocumentoModal.nativeElement.style.display = 'none';
    this.tipoDocumentoModal.nativeElement.removeAttribute('aria-modal');
    this.tipoDocumentoModal.nativeElement.removeAttribute('role');
  }
}

