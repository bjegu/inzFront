import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event} from './event.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  
  apiGeneral ='http://localhost:4200/api/';
  calendarSuffix = 'calendar/';

  constructor(private httpClient: HttpClient) { }

  getEvents(month:number, year: number):Observable<Event[]>{
    return this.httpClient.get<Event[]>(this.apiGeneral+this.calendarSuffix+year+"/"+month);
  }
}
