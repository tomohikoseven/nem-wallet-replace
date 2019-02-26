import { TestBed, inject } from '@angular/core/testing';

import { VotingUtilsService } from './voting-utils.service';

describe('VotingUtilsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VotingUtilsService]
    });
  });

  it('should be created', inject([VotingUtilsService], (service: VotingUtilsService) => {
    expect(service).toBeTruthy();
  }));
});
