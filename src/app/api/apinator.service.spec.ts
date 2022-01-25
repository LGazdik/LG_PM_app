import { TestBed } from '@angular/core/testing';

import { ApinatorService } from './apinator.service';

describe('ApinatorService', () => {
  let service: ApinatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApinatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
