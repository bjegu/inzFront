import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {

  @Input()
  page: number
  
  @Input()
  max: number

  @Output()
  change = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  next(){
    this.page++;
    this.change.emit(this.page);
  }

  previous(){
    this.page--;
    this.change.emit(this.page);
  }

}
