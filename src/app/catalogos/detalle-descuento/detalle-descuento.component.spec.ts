import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDescuentoComponent } from './detalle-descuento.component';

describe('DetalleDescuentoComponent', () => {
  let component: DetalleDescuentoComponent;
  let fixture: ComponentFixture<DetalleDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleDescuentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
