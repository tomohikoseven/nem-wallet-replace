import { TestBed, inject } from '@angular/core/testing';

import { NtyService } from './nty.service';

describe('NtyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NtyService]
    });
  });

  it('should be created', inject([NtyService], (service: NtyService) => {
    expect(service).toBeTruthy();
  }));
});
