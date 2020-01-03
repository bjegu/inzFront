import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Agreement } from './agreement.model';
import { AgreementService } from './agreement.service';
import { Router } from '@angular/router';

@Component({
  selector: '[app-agreement]',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent implements OnInit {

  @Input()
  agreement: Agreement;

  @Output()
  refresh = new EventEmitter();

  id:string;

  constructor(private agreementService: AgreementService,  private router: Router) { }

  ngOnInit() {
  }

  deleteAgreement(id: string){
    this.agreementService.deleteAgreement(id).subscribe(res=> this.refresh.emit(id));
  }
}
