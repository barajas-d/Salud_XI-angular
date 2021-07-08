import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCitasSinAgendarComponent } from './listar-citas-sin-agendar.component';

describe('ListarCitasSinAgendarComponent', () => {
  let component: ListarCitasSinAgendarComponent;
  let fixture: ComponentFixture<ListarCitasSinAgendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCitasSinAgendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCitasSinAgendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
