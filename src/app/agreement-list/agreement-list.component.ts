import { Component, OnInit } from '@angular/core';
import { Agreement } from '../agreement/agreement.model';
import { AgreementService } from '../agreement/agreement.service';

@Component({
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.component.html',
  styleUrls: ['./agreement-list.component.scss']
})
export class AgreementListComponent implements OnInit {

  agreementList: Agreement[] = [];

  constructor(private agreementService: AgreementService) { }

  ngOnInit() {
    this.agreementService.getAgreement().subscribe(response => this.agreementList = response)
  }

  
}
