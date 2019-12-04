import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, FormArray, Validators} from '@angular/forms'
import { ClientService } from '../client/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  customerForm: FormGroup;
  address: FormArray;
  radioSelected: string;

  constructor(private fb: FormBuilder, private clientService: ClientService) { }

  ngOnInit() {
    this.radioSelected = "Individual";
    this.customerForm = this.fb.group({
      name : ['', Validators.required],
      surname: ['', Validators.required],
      pesel: ['',[Validators.minLength(11), Validators.maxLength(11)]],
      email:['', Validators.email],
      phone:[''],
      regon:[''],
      compName:[''],
      address: this.fb.array([this.createAddress()])
      });
  }

  createAddress(): FormGroup {
    return this.fb.group({
      addressType: [''],
      street: ['',Validators.required],
      houseNumber: [''],
      localNumber:[''],
      postalCode: [''],
      city: [''],
    });
  }

  addAddress(): void{
    this.address = this.customerForm.get('address') as FormArray;
    this.address.push(this.createAddress());
  }

  removeAddressForm(addressIndex: number): void{
    this.address = this.customerForm.get('address') as FormArray;
    this.address.removeAt(addressIndex);

  }

  onSubmit(){
    //console.warn(this.customerForm.value);
    this.clientService.postClient(this.customerForm.value).subscribe();
    if (this.customerForm.valid){
      console.log("Form submitted successfully!");
      this.customerForm.reset();
    }
  }

  changeType(radioSelected: string): void{
    if (this.radioSelected =="Individual"){
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

}
