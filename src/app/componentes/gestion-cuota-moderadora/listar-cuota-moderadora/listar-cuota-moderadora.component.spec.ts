import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCuotaModeradoraComponent } from './listar-cuota-moderadora.component';

describe('ListarCuotaModeradoraComponent', () => {
  let component: ListarCuotaModeradoraComponent;
  let fixture: ComponentFixture<ListarCuotaModeradoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarCuotaModeradoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCuotaModeradoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
