import { TestBed } from '@angular/core/testing';
import { ProxyCitasService } from './proxy-citas.service';

describe('ProxyCitasService', () => {
  let service: ProxyCitasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProxyCitasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
