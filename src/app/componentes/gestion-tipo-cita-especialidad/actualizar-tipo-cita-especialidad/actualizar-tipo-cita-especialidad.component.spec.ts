import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTipoCitaEspecialidadComponent } from './actualizar-tipo-cita-especialidad.component';

describe('ActualizarTipoCitaEspecialidadComponent', () => {
  let component: ActualizarTipoCitaEspecialidadComponent;
  let fixture: ComponentFixture<ActualizarTipoCitaEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarTipoCitaEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarTipoCitaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
