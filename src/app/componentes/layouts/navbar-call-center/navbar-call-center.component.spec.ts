import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarCallCenterComponent } from './navbar-call-center.component';

describe('NavbarCallCenterComponent', () => {
  let component: NavbarCallCenterComponent;
  let fixture: ComponentFixture<NavbarCallCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarCallCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarCallCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
