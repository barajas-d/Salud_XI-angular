import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoCitaEspecialidadComponent } from './crear-tipo-cita-especialidad.component';

describe('CrearTipoCitaEspecialidadComponent', () => {
  let component: CrearTipoCitaEspecialidadComponent;
  let fixture: ComponentFixture<CrearTipoCitaEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTipoCitaEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTipoCitaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
