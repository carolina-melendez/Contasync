import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/Components/header/header.component";
import { Presupuesto } from '../../core/models/Presupuesto';
import { presupuestoService } from './presupuesto.service';
import { unidadService } from '../unidad-organizativa/unidad-organizativa.service';
import { UnidadOrganizativa } from '../../core/models/UnidadOrganizativa';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-presupuesto',
    standalone: true,
    templateUrl: './presupuesto.component.html',
    styleUrl: './presupuesto.component.css',
    imports: [HeaderComponent, CommonModule, ReactiveFormsModule]
})
export class PresupuestoComponent implements OnInit {
    presupuestos?: Presupuesto[];
    unidad?: UnidadOrganizativa[];
    filterPresupuesto = '';

    constructor(
        private presupuestoService: presupuestoService,
        private unidadService: unidadService
    ){}

    ngOnInit(): void {
        this.presupuestoService.getAll().subscribe((e) => (this.presupuestos = e));
        this.getUnidad();
    }

    getUnidad(): void{
        this.unidadService.getAll().subscribe((c) => (this.unidad = c));
    }

    getUnidadNombre(codigo?: number): string{
        if (codigo === undefined){
            return 'N/A';
        }
        const unidad = this.unidad?.find(c => c.codigo_unidad === codigo);
        return unidad && unidad.nombre_unidad ? unidad.nombre_unidad : 'N/A';
    }
}
