import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalednarDatePickerComponent } from './calednar-date-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModel, FormsModule } from '@angular/forms';

describe('CalednarDatePickerComponent', () => {
  let component: CalednarDatePickerComponent;
  let fixture: ComponentFixture<CalednarDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalednarDatePickerComponent ],
      imports: [NgbModule, FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalednarDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
