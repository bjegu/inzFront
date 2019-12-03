import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, FormArray} from '@angular/forms'
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
      name : [''],
      surname: [''],
      pesel: [''],
      email:[''],
      phone:[''],
      regon:[''],
      compName:[''],
      address: this.fb.array([this.createAddress()])
      });
  }

  createAddress(): FormGroup {
    return this.fb.group({
      addressType: [''],
      street: [''],
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
  }

  changeType(radioSelected: string): void{
    if( this.radioSelected = "Individual"){
      
    }
  }

}
