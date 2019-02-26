import { TestBed, inject } from '@angular/core/testing';

import { WalletBuilderService } from './wallet-builder.service';

describe('WalletBuilderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalletBuilderService]
    });
  });

  it('should be created', inject([WalletBuilderService], (service: WalletBuilderService) => {
    expect(service).toBeTruthy();
  }));
});
