import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from "../../shared/Components/header/header.component";
import { Presupuesto } from '../../core/models/Presupuesto';
import { presupuestoService } from './presupuesto.service';
import { unidadService } from '../unidad-organizativa/unidad-organizativa.service';
import { UnidadOrganizativa } from '../../core/models/UnidadOrganizativa';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-presupuesto',
    standalone: true,
    templateUrl: './presupuesto.component.html',
    styleUrls: ['./presupuesto.component.css'],
    imports: [HeaderComponent, CommonModule, ReactiveFormsModule]
})
export class PresupuestoComponent implements OnInit, AfterViewInit {
    @ViewChild('presupuestoModal') presupuestoModal!: ElementRef;
    presupuestos?: Presupuesto[];
    unidad?: UnidadOrganizativa[];
    presupuestoForm: FormGroup;
    filterPresupuesto = '';
    isEditMode = false;
    currentPresupuestoId: number | null = null;

    ngAfterViewInit() {
        console.log(this.presupuestoModal); 
    }

    constructor(
        private presupuestoService: presupuestoService, private fb: FormBuilder,
        private unidadService: unidadService) {
        this.presupuestoForm = this.fb.group({
            monto: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.presupuestoService.getAll().subscribe((e) => (this.presupuestos = e));
        this.getUnidad();
    }

    getUnidad(): void {
        this.unidadService.getAll().subscribe((c) => (this.unidad = c));
    }

    getUnidadNombre(codigo?: number): string {
        if (codigo === undefined) {
            return 'N/A';
        }
        const unidad = this.unidad?.find(c => c.codigo_unidad === codigo);
        return unidad && unidad.nombre_unidad ? unidad.nombre_unidad : 'N/A';
    }

    loadPresupuesto() {
        this.presupuestoService.getAll().subscribe((data: Presupuesto[]) => {
            this.presupuestos = data;
        });
    }

    openCreateModal() {
        console.log("Abriendo modal para agregar nuevo presupuesto");
        this.isEditMode = false;
        this.presupuestoForm.reset();
        this.showModal();
    }

    openEditModal(presupuesto: Presupuesto) {
        this.isEditMode = true;
        if (presupuesto.codig_presupuestario !== undefined) {
            this.currentPresupuestoId = presupuesto.codig_presupuestario;
        }
        this.presupuestoForm.patchValue(presupuesto); // <- Cambiado aquí
        this.showModal();
    }

    savePresupuesto() {
        if (this.presupuestoForm.invalid) {
            return;
        }

        const presupuestoData = this.presupuestoForm.value;

        if (this.isEditMode && this.currentPresupuestoId !== null) {
            this.presupuestoService.update({ ...presupuestoData, codig_presupuestario: this.currentPresupuestoId }).subscribe(() => {
                this.showSuccessAlert('Presupuesto actualizado correctamente');
                this.loadPresupuesto();
                this.hideModal();
            });
        } else {
            this.presupuestoService.create(presupuestoData).subscribe(() => {
                this.showSuccessAlert('Presupuesto creado correctamente');
                this.loadPresupuesto();
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
        if (this.presupuestoModal && this.presupuestoModal.nativeElement) {
            this.presupuestoModal.nativeElement.classList.add('show');
            this.presupuestoModal.nativeElement.style.display = 'block';
            this.presupuestoModal.nativeElement.setAttribute('aria-modal', 'true');
            this.presupuestoModal.nativeElement.setAttribute('role', 'dialog');
        } else {
            console.error('presupuestoModal is not defined');
        }
    }
    
    hideModal() {
        if (this.presupuestoModal && this.presupuestoModal.nativeElement) {
            this.presupuestoModal.nativeElement.classList.remove('show');
            this.presupuestoModal.nativeElement.style.display = 'none';
            this.presupuestoModal.nativeElement.removeAttribute('aria-modal');
            this.presupuestoModal.nativeElement.removeAttribute('role');
        }
    }
}
