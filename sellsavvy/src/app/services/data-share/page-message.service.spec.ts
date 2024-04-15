import { TestBed } from '@angular/core/testing';

import { PageMessageService } from './page-message.service';

describe('PageMessageService', () => {
  let service: PageMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
