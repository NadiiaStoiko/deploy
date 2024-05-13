import { TestBed } from '@angular/core/testing';

import { AccountingApiService } from './accounting-api.service';

describe('AccountingApiService', () => {
  let service: AccountingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
