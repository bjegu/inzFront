import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { Event, EventType } from '../event.model';
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

  @Input()
  public editedEvent: Event;

  modalTitle = 'Add a new event';
  modalSubmit = 'Add an event';

  eventForm: FormGroup;
  types: EventType[] = [];

  hoveredDate: NgbDate;

  constructor(private calendarService: CalendarService, private clientService: ClientService, public modal: NgbActiveModal, private fb: FormBuilder, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {

  }

  ngOnInit() {
    let fromDate = this.calendar.getToday();
    let toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);
    this.calendarService.getTypes().subscribe(res => this.setTypes(res));
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDay: [fromDate, Validators.required],
      startTime: ['', Validators.required],
      finishDay: [toDate, Validators.required],
      finishTime: ['', Validators.required],
      start: [''],
      finish: [''],
      eventType: ['', Validators.required],
      contact: [''],
      contactPhone: [''],
      eventClients: this.fb.array([])
    })
    if (this.editedEvent) {
      this.modalTitle = "Edit an event";
      this.modalSubmit = "Edit";
      const startDate = new Date(this.editedEvent.start)
      const finishDate = new Date(this.editedEvent.finish)
      const dateToPatch = {
        startDay: StringUtils.convertDateToNbDate(startDate), finishDay: StringUtils.convertDateToNbDate(finishDate),
        startTime: StringUtils.convertDateToNbTime(startDate), finishTime: StringUtils.convertDateToNbTime(finishDate)
      }
      let contactPatch = {contact: null, contactPhone: ''}
      if(this.editedEvent.eventClients[0].client){
        contactPatch.contact = this.editedEvent.eventClients[0].client
      } else{
        contactPatch.contact = this.editedEvent.eventClients[0].name,
        contactPatch.contactPhone = this.editedEvent.eventClients[0].phone
      }
      this.eventForm.patchValue(Object.assign(this.editedEvent, dateToPatch, contactPatch))
    }
  }

  setTypes(types: EventType[]) {
    this.types = types;
    if (this.editedEvent) {
      this.eventForm.get('eventType').setValue(this.types.find(it => it.id === this.editedEvent.eventType.id))
    }
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
    this.calendarService
      .postEvent(Object.assign({} ,this.eventForm.value,  this.editedEvent ? {uuid: this.editedEvent.uuid} : {}))
      .subscribe(res => this.modal.close(res))
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

  getStartDay() {
    return this.eventForm.get('startDay').value
  }

  getFinishDay() {
    return this.eventForm.get('finishDay').value
  }
}
