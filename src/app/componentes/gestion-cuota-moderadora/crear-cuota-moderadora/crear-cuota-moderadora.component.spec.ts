import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCuotaModeradoraComponent } from './crear-cuota-moderadora.component';

describe('CrearCuotaModeradoraComponent', () => {
  let component: CrearCuotaModeradoraComponent;
  let fixture: ComponentFixture<CrearCuotaModeradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearCuotaModeradoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCuotaModeradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
