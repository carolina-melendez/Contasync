import { Routes } from "@angular/router";
import { EmpleadosComponent } from "./empleados/empleados.component";
import { OrganizacionComponent } from "./organizacion/organizacion.component";
import { PlanillaComponent } from "./planilla/planilla.component";
import { PresupuestoComponent } from "./presupuesto/presupuesto.component";
import { UnidadOrganizativaComponent } from "./unidad-organizativa/unidad-organizativa.component";
import { UsuarioComponent } from "./usuario/usuario.component";
import { RegistrarEmpleadoComponent } from "./empleados/registrar-empleado/registrar-empleado.component";
import { VerEmpleadoComponent } from "./empleados/ver-empleado/ver-empleado.component";


export const GESTIONES_ROUTES: Routes = [
    {path: 'empleados', component: EmpleadosComponent},
    {path: 'organizacion', component: OrganizacionComponent},
    {path: 'planilla', component: PlanillaComponent},
    {path: 'presupuesto', component: PresupuestoComponent},
    {path: 'unidad-organizativa', component: UnidadOrganizativaComponent},
    {path: 'usuario', component: UsuarioComponent},

    {path: 'empleados/registrar-empleado', component:RegistrarEmpleadoComponent},
    {path: 'empleados/ver-empleado/{id}', component:VerEmpleadoComponent},
];