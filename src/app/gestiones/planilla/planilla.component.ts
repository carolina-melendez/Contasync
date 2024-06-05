import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/Components/header/header.component";

@Component({
    selector: 'app-planilla',
    standalone: true,
    templateUrl: './planilla.component.html',
    styleUrl: './planilla.component.css',
    imports: [HeaderComponent]
})
export class PlanillaComponent {
    
}
