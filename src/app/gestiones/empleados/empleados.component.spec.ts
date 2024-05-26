import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosComponent } from './empleados.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

describe('EmpleadosComponent', () => {
  let component: EmpleadosComponent;
  let fixture: ComponentFixture<EmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, RouterOutlet, EmpleadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
