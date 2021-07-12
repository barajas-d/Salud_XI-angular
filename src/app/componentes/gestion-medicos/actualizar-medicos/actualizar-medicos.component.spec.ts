import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarMedicosComponent } from './actualizar-medicos.component';

describe('ActualizarMedicosComponent', () => {
  let component: ActualizarMedicosComponent;
  let fixture: ComponentFixture<ActualizarMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarMedicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
