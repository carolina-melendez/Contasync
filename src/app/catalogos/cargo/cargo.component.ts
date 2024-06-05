import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { CargoService } from './cargo.service';
import { Cargo } from '../../core/models/Cargo';
import { HeaderComponent } from '../../shared/Components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cargo',
  templateUrl: './cargo.component.html',
  styleUrls: ['./cargo.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent]
})
export class CargoComponent implements OnInit {
  @ViewChild('cargoModal') cargoModal!: ElementRef;
  cargos: Cargo[] = [];
  cargoForm: FormGroup;
  isEditMode = false;
  currentCargoId: number | null = null;

  constructor(private cargoService: CargoService, private fb: FormBuilder) {
    this.cargoForm = this.fb.group({
      cargo_descripcion: ['', Validators.required],
      salario_maximo: ['', Validators.required],
      salario_minimo: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadCargos();
  }

  loadCargos() {
    this.cargoService.getAll().subscribe((data: Cargo[]) => {
      this.cargos = data;
    });
  }

  openCreateModal() {
    console.log("Abriendo modal para crear nuevo cargo");
    this.isEditMode = false;
    this.cargoForm.reset();
    this.showModal();
}


  openEditModal(cargo: Cargo) {
    this.isEditMode = true;
    if (cargo.codigo_cargo !== undefined) {
      this.currentCargoId = cargo.codigo_cargo;
    }
    this.cargoForm.patchValue(cargo);
    this.showModal();
  }

  saveCargo() {
    if (this.cargoForm.invalid) {
      return;
    }

    const cargoData = this.cargoForm.value;

    if (this.isEditMode && this.currentCargoId !== null) {
      this.cargoService.update({ ...cargoData, codigo_cargo: this.currentCargoId }).subscribe(() => {
        this.showSuccessAlert('Cargo actualizado correctamente');
        this.loadCargos();
        this.hideModal();
      });
    } else {
      this.cargoService.create(cargoData).subscribe(() => {
        this.showSuccessAlert('Cargo creado correctamente');
        this.loadCargos();
        this.hideModal();
      });
    }
  }

  confirmDelete(codigo_cargo: number) {
    if (codigo_cargo === undefined) {
      console.error('Código de cargo es undefined');
      return;
    }
  
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
        this.cargoService.delete(codigo_cargo).subscribe(() => {
          this.showSuccessAlert('Cargo eliminado correctamente');
          this.loadCargos();
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
    console.log(this.cargoModal); // Verificar que cargoModal esté definido
    this.cargoModal.nativeElement.classList.add('show');
    this.cargoModal.nativeElement.style.display = 'block';
    this.cargoModal.nativeElement.setAttribute('aria-modal', 'true');
    this.cargoModal.nativeElement.setAttribute('role', 'dialog');
}

hideModal() {
    this.cargoModal.nativeElement.classList.remove('show');
    this.cargoModal.nativeElement.style.display = 'none';
    this.cargoModal.nativeElement.removeAttribute('aria-modal');
    this.cargoModal.nativeElement.removeAttribute('role');
}
}
