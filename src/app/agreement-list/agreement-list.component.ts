import { Component, OnInit } from '@angular/core';
import { Agreement } from '../agreement/agreement.model';
import { AgreementService } from '../agreement/agreement.service';
import { Page } from '../shared/page.model';

@Component({
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.component.html',
  styleUrls: ['./agreement-list.component.scss']
})
export class AgreementListComponent implements OnInit {

  agreementList: Agreement[] = [];
  totalPages: number;
  page = 1;
  searchAgreement: string;

  constructor(private agreementService: AgreementService) { }

  ngOnInit() {
    this.agreementService.getAgreement(1).subscribe(response => this.fetchData(response))
  }

  fetchData(page: Page<Agreement>){
    this.agreementList = page.content
    this.totalPages = page.totalPages
  }

  changePage(page: number){
    console.log(page);
    this.page = page;
    this.agreementService.getAgreement(page).subscribe(response => this.fetchData(response))
  }

  refresh(){
  this.changePage(this.page);
  }

  getAgreementsData(){

  }
  
}
