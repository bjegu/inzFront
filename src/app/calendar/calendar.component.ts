import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventTimesChangedEvent } from 'angular-calendar';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import { CalendarService } from './calendar.service';
import { Event } from './event.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';
import { StringUtils } from '../shared/string.utils';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  viewDate: Date = new Date();
  eventsList: Event[];
  refresh: any;

  events: CalendarEvent[] = [
    {
      start: new Date(),
      end: addDays(new Date(), 1),
      title: 'Testevent',
      color: {
        primary: '#ad2121',
        secondary: '#FAE3E3'
      },
      actions: [],
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }
  ];
  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    let toSaveEvent = (event['orignalEvent'] as Event);
    toSaveEvent.start = newStart.toJSON()
    toSaveEvent.finish = newEnd.toJSON()
    this.calendarSevice.postEvent(toSaveEvent).subscribe(res => console.log(res))
  }

  constructor(private calendarSevice: CalendarService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getEventByMonth();
  }

  convertEvents(events: Event[]) {
    this.events = [];
    this.eventsList = events;
    events.forEach(element => {
      this.events.push({
        start: new Date(element.start),
        end: new Date(element.finish),
        title: this.prepareEventLabel(element),
        color: {
          primary: '#ad2121',
          secondary: '#FAE3E3'
        },
        actions: [],
        allDay: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true,
        orignalEvent: element
      } as CalendarEvent)
    });
  }

  prepareEventLabel(event: Event): string {
    
    return event.name + ' ' + event.eventType.eventTypeName + ' start: ' + StringUtils.showTime(event.start) + this.getClientsLabel(event)
  }

  getClientsLabel(event: Event): string {
    const client = event.eventClients[0]
    const isClient = !!client;
    return (isClient) ? ' with: ' + client.name : '';
  }

  getEventByMonth() {
    this.calendarSevice.getEvents(this.viewDate.getFullYear(), this.viewDate.getMonth()).subscribe((res) => this.convertEvents(res));
  }

  handleEvent(value: string, event: CalendarEvent){

  }

  openAdd() {
    const modalRef = this.modalService.open(CalendarFormComponent);
    modalRef.result.then(() => this.getEventByMonth()).catch(() => { })
  }

}
