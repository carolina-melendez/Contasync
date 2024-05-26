import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDescuentoComponent } from './tipo-descuento.component';

describe('TipoDescuentoComponent', () => {
  let component: TipoDescuentoComponent;
  let fixture: ComponentFixture<TipoDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipoDescuentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TipoDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
