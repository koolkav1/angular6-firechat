import { TestBed, inject } from '@angular/core/testing';

import { DirectMessaingService } from './direct-messaing.service';

describe('DirectMessaingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DirectMessaingService]
    });
  });

  it('should be created', inject([DirectMessaingService], (service: DirectMessaingService) => {
    expect(service).toBeTruthy();
  }));
});
