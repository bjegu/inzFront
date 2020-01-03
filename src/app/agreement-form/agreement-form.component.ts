import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AgreementService } from '../agreement/agreement.service';
import { ClientService } from '../client/client.service';
import { Client } from '../client/client.model';
import { Observable, Subject, merge } from 'rxjs';
import { map, switchMap, debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { AgreementType } from '../agreement/agreement.model';
import { Router } from '@angular/router';
import { StringUtils } from '../shared/string.utils';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agreement-form',
  templateUrl: './agreement-form.component.html',
  styleUrls: ['./agreement-form.component.scss']
})
export class AgreementFormComponent implements OnInit {

  agreementForm: FormGroup;
  types: AgreementType[] = [];

  // @ViewChild('instance', {static: true}) instance: NgbTypeahead;
  // focus$ = new Subject<string>();
  // click$ = new Subject<string>();

  constructor(private fb: FormBuilder, private agreementService: AgreementService, private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.agreementForm = this.fb.group({
      agreementNo: [''],
      start: [''],
      end: [''],
      additional: [''],
      client: [''],
      agreementType: [null],
      active: [true]
    })
    this.agreementService.getAgreementType().subscribe(res => this.types = res)
  }

  onSubmit() {
    console.warn(this.agreementForm.value);
    const toSubmit = this.agreementForm.value;
    toSubmit.start = StringUtils.convertDate(toSubmit.start)
    toSubmit.end = StringUtils.convertDate(toSubmit.end)
    this.agreementService.postAgreement(toSubmit).subscribe(() => this.router.navigateByUrl('/agreementList'));
  }

  searchClient = (text$: Observable<string>) => text$
    .pipe(
      switchMap(text => this.clientService.getClients('name', false, text)),
    )
  clientFormatter = (client: Client) => (client) ? client.name + ' ' + client.surname : ""

  // searchType = (text$: Observable<string>) => {
  //   const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
  //   const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
  //   const inputFocus$ = this.focus$;

  //   return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
  //     map(term => this.types.filter(type => type.agrName.includes(term)).slice(0, 10))
  //   )};
  
  // typeFormatter = (type: AgreementType) => type ? type.agrName : ""

}
