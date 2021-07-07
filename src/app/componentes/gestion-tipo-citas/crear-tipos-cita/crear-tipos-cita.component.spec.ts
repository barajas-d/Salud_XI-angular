import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTiposCitaComponent } from './crear-tipos-cita.component';

describe('CrearTiposCitaComponent', () => {
  let component: CrearTiposCitaComponent;
  let fixture: ComponentFixture<CrearTiposCitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTiposCitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTiposCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
