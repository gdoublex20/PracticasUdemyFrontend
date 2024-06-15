import { TestBed } from '@angular/core/testing';

import { MoldaEliminarService } from './molda-eliminar.service';

describe('MoldaEliminarService', () => {
  let service: MoldaEliminarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoldaEliminarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
