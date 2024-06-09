import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: () => import('./catalogos/catalogos.routes').then(m => m.CATALOGO_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./general/general.routes').then(m => m.GENERAL_ROUTES)
    },
    {
        path: '',
        loadChildren: () => import('./gestiones/gestiones.routes').then(m => m.GESTIONES_ROUTES )
    }
];
