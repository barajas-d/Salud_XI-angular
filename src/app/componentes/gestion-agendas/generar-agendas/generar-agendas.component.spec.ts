import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerarAgendasComponent } from './generar-agendas.component';

describe('GenerarAgendasComponent', () => {
  let component: GenerarAgendasComponent;
  let fixture: ComponentFixture<GenerarAgendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerarAgendasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerarAgendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
