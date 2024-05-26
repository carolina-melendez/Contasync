import { Routes } from "@angular/router";
import { CargoComponent } from "./cargo/cargo.component";
import { DepartamentoComponent } from "./departamento/departamento.component";
import { DetalleDescuentoComponent } from "./detalle-descuento/detalle-descuento.component";
import { EstadoCivilComponent } from "./estado-civil/estado-civil.component";
import { MunicipioComponent } from "./municipio/municipio.component";
import { PaisComponent } from "./pais/pais.component";
import { ProfesionComponent } from "./profesion/profesion.component";
import { TipoDescuentoComponent } from "./tipo-descuento/tipo-descuento.component";
import { TipoDocumentoComponent } from "./tipo-documento/tipo-documento.component";


export const CATALOGO_ROUTES: Routes = [
        {path: 'cargo', component: CargoComponent},
        {path: 'departamento', component: DepartamentoComponent},
        {path: 'detalle-descuento', component: DetalleDescuentoComponent},
        {path: 'estado-civil', component: EstadoCivilComponent},
        {path: 'municipio', component: MunicipioComponent},
        {path: 'pais', component: PaisComponent},
        {path: 'profesion', component: ProfesionComponent},
        {path: 'tipo-descuento', component: TipoDescuentoComponent},
        {path: 'tipo-documento', component: TipoDocumentoComponent},  
];