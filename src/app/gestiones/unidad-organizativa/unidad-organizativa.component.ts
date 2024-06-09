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
  todasLasUnidades: UnidadOrganizativa[] = [];
  unidadForm: FormGroup;
  isEditMode = false;
  currentUnidadId: number | null = null;

  constructor(private unidadService: unidadService, private fb: FormBuilder){
    this.unidadForm = this.fb.group({
      centro_costos: ['', Validators.required],
      nombre_unidad: ['', Validators.required],
      codigo_estructura: ['', Validators.required],
      codigo_padre: ['', Validators.required]
    });
  }

  ngOnInit(){
    this.loadUnidad();
  }

  loadUnidad(){
    this.unidadService.getAll().subscribe((data: UnidadOrganizativa[]) => {
      this.unidad = data;
      this.todasLasUnidades = data; // Asumiendo que tienes todas las unidades en la misma llamada
    });
  }

  openCreateModal(){
    this.isEditMode = false;
    this.unidadForm.reset();
    this.showModal();
  }

  openEditModal(unidad: UnidadOrganizativa){
    this.isEditMode = true;
    if(unidad.codigo_organizacion !== undefined){
      this.currentUnidadId = unidad.codigo_organizacion;
    }
    this.unidadForm.patchValue(unidad);
    this.showModal();
  }

  saveUnidad(){
    if (this.unidadForm.invalid){
      return;
    }

    const unidadData = this.unidadForm.value;

    if(this.isEditMode && this.currentUnidadId !== null){
      this.unidadService.update({...unidadData, id: this.currentUnidadId}).subscribe(() => {
        this.showSuccessAlert('Unidad actualizada correctamente');
        this.loadUnidad();
        this.hideModal();
      });
    } else {
      this.unidadService.create(unidadData).subscribe(() =>{
        this.showSuccessAlert('Unidad creada correctamente');
        this.loadUnidad();
        this.hideModal();
      });
    }
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

  getNombrePadre(codigoestructura: string): string {
    const padre = this.todasLasUnidades.find(unidad => unidad.codigo_unidad?.toString() === codigoestructura);
    return padre?.nombre_unidad ?? 'N/A';
  }
}