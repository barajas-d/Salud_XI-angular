import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCentrosMedicosComponent } from './crear-centros-medicos.component';

describe('CrearCentrosMedicosComponent', () => {
  let component: CrearCentrosMedicosComponent;
  let fixture: ComponentFixture<CrearCentrosMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCentrosMedicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCentrosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
