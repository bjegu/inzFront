import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AgreementService } from '../agreement/agreement.service';
import { ClientService } from '../client/client.service';
import { Client } from '../client/client.model';
import { Observable } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { AgreementType } from '../agreement/agreement.model';

@Component({
  selector: 'app-agreement-form',
  templateUrl: './agreement-form.component.html',
  styleUrls: ['./agreement-form.component.scss']
})
export class AgreementFormComponent implements OnInit {

  agreementForm: FormGroup;
  types: AgreementType[] = [];

  constructor(private fb: FormBuilder, private agreementService: AgreementService, private clientService: ClientService) { }

  ngOnInit() {
    this.agreementForm = this.fb.group({
      agreementNo: [''],
      start: [''],
      end: [''],
      additional: [''],
      client: [''],
      agreement_type: [null]
    })
    this.agreementService.getAgreementType().subscribe(res => this.types = res)
  }

  onSubmit() {
    console.warn(this.agreementForm.value);
    let object = this.agreementForm.value
    // const clientId = this.agreementForm.value.client.clientId
    // delete object.client
    // object.clientId = clientId
    this.agreementService.postAgreement(object).subscribe();
  }

  searchClient = (text$: Observable<string>) => text$
    .pipe(
      switchMap(text => this.clientService.getClients('name', false, text)),
    )
  clientFormatter = (client: Client) => (client) ? client.name + ' ' + client.surname : ""

  searchType = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.types.filter(type => type.agrName.includes(term)).slice(0, 10))
  )
  typeFormatter = (type: AgreementType) => type ? type.agrName : ""
}
