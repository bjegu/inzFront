import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { HttpClientModule } from '@angular/common/http';

describe('CalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule],
    providers: [CalendarService]}));

  it('should be created', () => {
    const service: CalendarService = TestBed.get(CalendarService);
    expect(service).toBeTruthy();
  });
});
