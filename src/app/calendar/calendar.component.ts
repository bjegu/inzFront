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
import { ThrowStmt } from '@angular/compiler';
import { Event} from './event.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarFormComponent } from './calendar-form/calendar-form.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {


  viewDate: Date = new Date();
  eventsList: Event[];

  events: CalendarEvent[] = [
    {
      start: new Date(),
      end: addDays(new Date(), 1),
      title: 'Testevent',
      color:  {
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
      console.log('Dropped or resized', event);
    }

  constructor(private calendarSevice: CalendarService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getEventByMonth();
  }

  convertEvents(events: Event[]){
    this.events=[];
    this.eventsList=events;
    events.forEach(element => {
      this.events.push({
        start: new Date(element.start),
        end: new Date(element.finish),
        title: element.name+element.eventType.eventTypeName,
        color:  {
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
      })
    });
  }

  getEventByMonth(){
    this.calendarSevice.getEvents(this.viewDate.getFullYear(), this.viewDate.getMonth()).subscribe((res)=>this.convertEvents(res));
  }

  openAdd(){
    const modalRef =this.modalService.open(CalendarFormComponent);
  }

}
