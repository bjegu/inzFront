import { TestBed } from '@angular/core/testing';

import { ClientService } from './client.service';
import { HttpClientModule } from '@angular/common/http';

describe('ClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule],
    providers: [ClientService]}));

  it('should be created', () => {
    const service: ClientService = TestBed.get(ClientService);
    expect(service).toBeTruthy();
  });
});
