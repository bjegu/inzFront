import { Component, OnInit, Input } from '@angular/core';
import { Agreement } from './agreement.model';

@Component({
  selector: 'app-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  @Input()
  agreement: Agreement;

  constructor() { }

  ngOnInit() {
  }

}
