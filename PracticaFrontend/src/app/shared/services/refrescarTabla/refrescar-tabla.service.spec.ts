import { TestBed } from '@angular/core/testing';

import { RefrescarTablaService } from './refrescar-tabla.service';

describe('RefrescarTablaService', () => {
  let service: RefrescarTablaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefrescarTablaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
