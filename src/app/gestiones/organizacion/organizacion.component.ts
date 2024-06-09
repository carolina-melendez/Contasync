import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../shared/Components/header/header.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Organizacion } from '../../core/models/Organizacion';
import { organizacionService } from './organizacion.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-organizacion',
    standalone: true,
    templateUrl: './organizacion.component.html',
    styleUrl: './organizacion.component.css',
    imports: [HeaderComponent, CommonModule, ReactiveFormsModule]
})
export class OrganizacionComponent implements OnInit {
    @ViewChild('organizacionModal') organizacionModal!: ElementRef;
    organizacion: Organizacion[] = [];
    organizacionForm: FormGroup;
    isEditMode = false;
    currentOrganizacionId: number | null = null;

    constructor(private organizacionService: organizacionService, private fb: FormBuilder){
        this.organizacionForm = this.fb.group({
            nombre_organizacion: ['', Validators.required],
            representante_legal: ['', Validators.required],
            nic: ['', Validators.required],
            sitio_web: ['', Validators.required],
            numero_identificacion_tributaria: ['', Validators.required],
        });
    }
    ngOnInit(){
        this.loadOrganizacion();
    }
    loadOrganizacion(){
        this.organizacionService.getAll().subscribe((data: Organizacion[]) =>{
            this.organizacion = data;
        });
    }

    openCreateModal(){
        console.log("Abriendo modal para editar la informacion de organizacion");
        this.isEditMode = false;
        this.organizacionForm.reset();
        this.showModal();
    }

    openEditModal(organizacion: Organizacion){
        this.isEditMode = true;
        if(organizacion.codigo_organizacion !== undefined){
            this.currentOrganizacionId = organizacion.codigo_organizacion;
        }
        this.organizacionForm.patchValue(organizacion);
        this.showModal();
    }

    saveOrganizacion(){
        if (this.organizacionForm.invalid){
            return;
        }

        const organizacionData = this.organizacionForm.value;

        if(this.isEditMode && this.currentOrganizacionId !== null){
            this.organizacionService.update({...organizacionData, codigo_organizacion: this.currentOrganizacionId}).subscribe(() => {
                this.showSuccessAlert('Organizacion actualizada correctamente');
                this.loadOrganizacion();
                this.hideModal();
            });
        } else {
            this.organizacionService.create(organizacionData).subscribe(() =>{
                this.showSuccessAlert('Organizacion creada correcto');
                this.loadOrganizacion();
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
        console.log(this.organizacionModal); // Verificar que cargoModal esté definido
        this.organizacionModal.nativeElement.classList.add('show');
        this.organizacionModal.nativeElement.style.display = 'block';
        this.organizacionModal.nativeElement.setAttribute('aria-modal', 'true');
        this.organizacionModal.nativeElement.setAttribute('role', 'dialog');
    }
    
    hideModal() {
        this.organizacionModal.nativeElement.classList.remove('show');
        this.organizacionModal.nativeElement.style.display = 'none';
        this.organizacionModal.nativeElement.removeAttribute('aria-modal');
        this.organizacionModal.nativeElement.removeAttribute('role');
    }
}
