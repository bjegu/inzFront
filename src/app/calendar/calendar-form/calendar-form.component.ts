import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { EventType } from '../event.model';
import { CalendarService } from '../calendar.service';
import { StringUtils } from 'src/app/shared/string.utils';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Client } from 'src/app/client/client.model';
import { ClientService } from 'src/app/client/client.service';

@Component({
  selector: 'app-calendar-form',
  templateUrl: './calendar-form.component.html',
  styleUrls: ['./calendar-form.component.scss']
})
export class CalendarFormComponent implements OnInit {

  eventForm: FormGroup;
  types: EventType[] = [];

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private calendarService: CalendarService, private clientService: ClientService, public modal: NgbActiveModal, private fb: FormBuilder, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit() {
    this.calendarService.getTypes().subscribe(res => this.types = res);
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDay: [this.fromDate, Validators.required],
      startTime: ['', Validators.required],
      finishDay: [this.toDate, Validators.required],
      finishTime: ['', Validators.required],
      start: [''],
      finish: [''],
      eventType: ['', Validators.required],
      contact: [''],
      contactPhone: [''],
      eventClients: this.fb.array([])
    })
  }

  onSubmit() {
    this.eventForm.patchValue({
      start: StringUtils.convertDateTime(this.eventForm.get('startDay').value, this.eventForm.get('startTime').value),
      finish: StringUtils.convertDateTime(this.eventForm.get('finishDay').value, this.eventForm.get('finishTime').value)
    });
    const contact = this.eventForm.get('contact').value;
    (this.eventForm.controls.eventClients as FormArray).push(this.fb.group({
      name: [this.isClient() ? contact.name + ' ' + contact.surname : contact],
      phone: [this.isClient() ? contact.phone : this.eventForm.get('contactPhone').value],
      client: [this.isClient() ? contact : null]
    }))
    this.calendarService.postEvent(this.eventForm.value).subscribe(res => this.modal.close(res))
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate, input: string): NgbDate {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  searchClient = (text$: Observable<string>) => text$
    .pipe(
      switchMap(text => this.clientService.getClients('name', false, text)),
    )
  clientFormatter = (client: Client) => (client) ? client.name + ' ' + client.surname : ""

  getClient() {
    return JSON.stringify(this.eventForm.get('contact').value)
  }
  isClient() {
    return typeof this.eventForm.get('contact').value !== 'string'
  }

  unlink() {
    if (this.isClient()) {
      const contactControl = this.eventForm.get('contact');
      contactControl.setValue(contactControl.value.name + ' ' + contactControl.value.surname)
    }
  }
}
