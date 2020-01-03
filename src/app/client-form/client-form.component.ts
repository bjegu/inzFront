import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'
import { ClientService } from '../client/client.service';
import { lengthValidator } from '../custom-validators/regon-validator';
import { Client } from '../client/client.model';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  customerForm: FormGroup;
  address: FormArray;
  radioSelected: string;
  showMsg: boolean = false;
  individual="Individual";
  company="Company";

  @Input()
  input: Client;

  constructor(private fb: FormBuilder, private clientService: ClientService) { }

  ngOnInit() {
    this.radioSelected = this.individual;
    this.address = this.fb.array([]);
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      pesel: ['', [Validators.minLength(11), Validators.maxLength(11)]],
      email: ['', Validators.email],
      phone: [''],
      regon: [null, lengthValidator],
      compName: [''],
      address: this.address
    });
    if (this.input) {
      this.radioSelected=this.input.pesel? this.individual:this.company;
      this.input.address.forEach(address=> this.address.push(this.createAddress()));
      this.customerForm.patchValue(this.input);
    } else {
      this.address.push(this.createAddress());
    }
  }

  createAddress(): FormGroup {
    return this.fb.group({
      uuid: [null],
      addressType: [''],
      street: ['', Validators.required],
      houseNumber: [''],
      localNumber: [''],
      postalCode: [''],
      city: [''],
    });
  }

  addAddress(): void {
    this.address = this.customerForm.get('address') as FormArray;
    this.address.push(this.createAddress());
  }

  removeAddressForm(addressIndex: number): void {
    this.address = this.customerForm.get('address') as FormArray;
    this.address.removeAt(addressIndex);

  }

  onSubmit() {
    //console.warn(this.customerForm.value);
    let client = this.customerForm.value;
    if (this.input) {
      client.uuid = this.input.uuid;
    }
    this.clientService.postClient(client).subscribe();
    if (this.customerForm.valid) {
      console.log("Form submitted successfully!");
      this.customerForm.reset();
      this.showMsg = true;
    }
  }

  changeType(radioSelected: string): void {
    if (this.radioSelected == this.individual) {
      this.customerForm.controls['regon'].reset();
      this.customerForm.controls['compName'].reset();
    } else {
      this.customerForm.controls['pesel'].reset();
    }
  }

  get name() {
    return this.customerForm.get('name');
  }

  get surname() {
    return this.customerForm.get('surname');
  }

  get pesel() {
    return this.customerForm.get('pesel');
  }

  get email() {
    return this.customerForm.get('email');
  }

  get regon() {
    return this.customerForm.get('regon');
  }

}
