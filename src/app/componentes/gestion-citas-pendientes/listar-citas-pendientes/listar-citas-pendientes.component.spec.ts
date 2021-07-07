import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCitasPendientesComponent } from './listar-citas-pendientes.component';

describe('ListarCitasPendientesComponent', () => {
  let component: ListarCitasPendientesComponent;
  let fixture: ComponentFixture<ListarCitasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCitasPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCitasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
