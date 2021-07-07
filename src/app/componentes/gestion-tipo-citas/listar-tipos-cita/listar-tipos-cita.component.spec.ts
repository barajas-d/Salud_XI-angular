import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTiposCitaComponent } from './listar-tipos-cita.component';

describe('ListarTiposCitaComponent', () => {
  let component: ListarTiposCitaComponent;
  let fixture: ComponentFixture<ListarTiposCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTiposCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTiposCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
