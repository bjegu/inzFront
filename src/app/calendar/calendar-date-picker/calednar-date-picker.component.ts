import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { addMonths } from 'date-fns';


@Component({
  selector: 'app-calednar-date-picker',
  templateUrl: './calednar-date-picker.component.html',
  styleUrls: ['./calednar-date-picker.component.scss']
})
export class CalednarDatePickerComponent implements OnInit {

  @Output()
  dayChange = new EventEmitter();

  day: { year, month, day };
  selectedMonth: string;


  constructor() { }

  ngOnInit() {
    this.setOnToday()
  }
  setOnToday(){
    const today = new Date()
    this.day = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: 1
    }
    this.selectedMonth = this.prepareMonthString(this.day.month)
  }
  setOnTodayWithEmit(){
    this.setOnToday()
    this.emit();
  }

  emit() {
    this.selectedMonth = this.prepareMonthString(this.day.month)
    this.dayChange.emit(new Date(this.day.year + "-" + this.day.month + "-" + this.day.day));
  }

  nextMonth() {
    this.dayChange.emit(this.addMonth(1));
    this.selectedMonth = this.prepareMonthString(this.day.month)
  }

  previousMonth() {
    this.dayChange.emit(this.addMonth(-1));
    this.selectedMonth = this.prepareMonthString(this.day.month)
  }

  addMonth(amount: number): Date {
    const newDate = addMonths(new Date(this.day.year + "-" + this.day.month + "-" + this.day.day), amount);
    this.day = {
      year: newDate.getFullYear(),
      month: newDate.getMonth()+1,
      day: this.day.day
    }
    return newDate;
  }

  prepareMonthString(month: number) {
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return mL[month - 1]
  }

}
