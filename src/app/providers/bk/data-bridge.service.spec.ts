import { TestBed, inject } from '@angular/core/testing';

import { DataBridgeService } from './data-bridge.service';

describe('DataBridgeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataBridgeService]
    });
  });

  it('should be created', inject([DataBridgeService], (service: DataBridgeService) => {
    expect(service).toBeTruthy();
  }));
});
