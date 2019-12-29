import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalednarDatePickerComponent } from './calednar-date-picker.component';

describe('CalednarDatePickerComponent', () => {
  let component: CalednarDatePickerComponent;
  let fixture: ComponentFixture<CalednarDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalednarDatePickerComponent ]
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
