import { TestBed } from '@angular/core/testing';

import { RealtyService } from './realty.service';

describe('RealtyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RealtyService = TestBed.get(RealtyService);
    expect(service).toBeTruthy();
  });
});
