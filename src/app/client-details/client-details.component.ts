import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../client/client.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationWindowComponent } from '../confirmation-window/confirmation-window.component';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  isEdited= false;

  constructor(private clientService: ClientService, private route: ActivatedRoute, private modalService: NgbModal, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getClientDetails();
  }

  fetchData(client: Client){
    this.client = client;
  }

  getClientDetails(){
    this.clientService.getClientById(this.id).subscribe(res=>this.fetchData(res));
  }

  deleteClient(){
    this.clientService.deleteClient(this.id).subscribe(res=>this.router.navigateByUrl('/clientList'));
  }

  open(){
   const modalRef =this.modalService.open(ConfirmationWindowComponent);
   modalRef.result
   .then((confirm) => this.deleteClient())
   .catch(() => {})
  }

}
