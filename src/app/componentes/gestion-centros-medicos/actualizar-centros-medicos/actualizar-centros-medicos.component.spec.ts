import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarCentrosMedicosComponent } from './actualizar-centros-medicos.component';

describe('ActualizarCentrosMedicosComponent', () => {
  let component: ActualizarCentrosMedicosComponent;
  let fixture: ComponentFixture<ActualizarCentrosMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarCentrosMedicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarCentrosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
