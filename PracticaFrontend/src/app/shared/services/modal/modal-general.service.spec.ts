import { TestBed } from '@angular/core/testing';

import { ModalGeneralService } from './modal-general.service';

describe('ModalGeneralService', () => {
  let service: ModalGeneralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalGeneralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
