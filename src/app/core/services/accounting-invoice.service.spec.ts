import { TestBed } from '@angular/core/testing';

import { AccountingInvoiceService } from './accounting-invoice.service';

describe('AccountingInvoiceService', () => {
  let service: AccountingInvoiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountingInvoiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
