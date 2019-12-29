import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { addMonths } from 'date-fns';


@Component({
  selector: 'app-calednar-date-picker',
  templateUrl: './calednar-date-picker.component.html',
  styleUrls: ['./calednar-date-picker.component.scss']
})
export class CalednarDatePickerComponent implements OnInit  {

  @Output()
  dayChange = new EventEmitter();

  day: {year,month,day};
  selectedMonth: string;
  

  constructor() { }

  ngOnInit() {
    const today = new Date()
    this.day = {
      year: today.getFullYear(),
      month: today.getMonth()+1,
      day: 1
    }
    this.selectedMonth = this.prepareMonthString(this.day.month)
  }

  emit(event:{year,month,day}){
    this.selectedMonth = this.prepareMonthString(event.month)
    this.dayChange.emit(new Date(event.year+"-"+event.month+"-"+event.day));
  }

  nextMonth(){
    this.day = {
        year: this.day.year,
        month: addMonths(this.day.month, 1).getMonth(),
        day: this.day.day
    }
    console.log(this.day)
  }

  previousMonth(){
    this.day.month = addMonths(this.day.month, -1).getMonth()
  }

  prepareMonthString(month: number){
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return mL[month-1]
  }

}
