import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event, EventType } from './event.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  apiGeneral = environment.apiUrl;
  calendarSuffix = 'calendar/';

  constructor(private httpClient: HttpClient) { }

  getEvents(month: number, year: number): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.apiGeneral + this.calendarSuffix + year + "/" + month);
  }

  getTypes(): Observable<EventType[]> {
    return this.httpClient.get<EventType[]>(this.apiGeneral + this.calendarSuffix + "/type");
  }

  postEvent(event: Event):Observable<Event>{
    return this.httpClient.post<Event>(this.apiGeneral + this.calendarSuffix, event)
  }
}
