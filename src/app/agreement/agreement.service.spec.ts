import { TestBed } from '@angular/core/testing';

import { AgreementService } from './agreement.service';
import { HttpClientModule } from '@angular/common/http';

describe('AgreementService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule],
    providers: [AgreementService]}));

  it('should be created', () => {
    const service: AgreementService = TestBed.get(AgreementService);
    expect(service).toBeTruthy();
  });
});
