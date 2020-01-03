import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarFormComponent } from './calendar-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTimepickerModule, NgbDatepickerModule, NgbTypeaheadModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

describe('CalendarFormComponent', () => {
  let component: CalendarFormComponent;
  let fixture: ComponentFixture<CalendarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarFormComponent ],
      imports: [FormsModule, ReactiveFormsModule, NgbTimepickerModule, NgbDatepickerModule, NgbTypeaheadModule, HttpClientModule],
      providers: [ NgbActiveModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
