import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCentrosMedicosComponent } from './listar-centros-medicos.component';

describe('ListarCentrosMedicosComponent', () => {
  let component: ListarCentrosMedicosComponent;
  let fixture: ComponentFixture<ListarCentrosMedicosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCentrosMedicosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCentrosMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
