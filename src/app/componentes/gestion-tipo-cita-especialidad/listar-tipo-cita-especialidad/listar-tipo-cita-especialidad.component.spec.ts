import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoCitaEspecialidadComponent } from './listar-tipo-cita-especialidad.component';

describe('ListarTipoCitaEspecialidadComponent', () => {
  let component: ListarTipoCitaEspecialidadComponent;
  let fixture: ComponentFixture<ListarTipoCitaEspecialidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTipoCitaEspecialidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTipoCitaEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
