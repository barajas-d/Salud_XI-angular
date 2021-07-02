import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCitasComponent } from './buscar-citas.component';

describe('BuscarCitasComponent', () => {
  let component: BuscarCitasComponent;
  let fixture: ComponentFixture<BuscarCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarCitasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
