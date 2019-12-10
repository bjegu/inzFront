import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AgreementService } from '../agreement/agreement.service';

@Component({
  selector: 'app-agreement-form',
  templateUrl: './agreement-form.component.html',
  styleUrls: ['./agreement-form.component.scss']
})
export class AgreementFormComponent implements OnInit {

  agreementForm: FormGroup;

  constructor(private fb: FormBuilder, private agreementService: AgreementService) { }

  ngOnInit() {
    this.agreementForm = this.fb.group({
      agreementNo: [''],
      start: [''],
      end: [''],
      additional:[''],
      client:['']
    }
    )
  }

  onSubmit(){
    console.warn(this.agreementForm.value);
    this.agreementService.postAgreement(this.agreementForm.value).subscribe();
  }

}
