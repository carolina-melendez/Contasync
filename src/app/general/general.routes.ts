import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "../auth/login/login.component";
import { AuthGuard } from '../auth/auth.guard';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';


export const GENERAL_ROUTES: Routes = [
    { path: 'dashboard', component: DashboardComponent},
    { path: 'login', component: LoginComponent},
    { path: 'reset-password', component: ResetPasswordComponent },
];
