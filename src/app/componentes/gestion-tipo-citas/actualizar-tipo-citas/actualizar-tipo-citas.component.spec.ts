import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarTipoCitasComponent } from './actualizar-tipo-citas.component';

describe('ActualizarTipoCitasComponent', () => {
  let component: ActualizarTipoCitasComponent;
  let fixture: ComponentFixture<ActualizarTipoCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarTipoCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarTipoCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
