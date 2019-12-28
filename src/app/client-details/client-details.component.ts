import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client/client.service';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../client/client.model';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;

  constructor(private clientService: ClientService, private route: ActivatedRoute) { }

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
    this.clientService.deleteClient(this.id).subscribe(res=>this.fetchData(res));
  }



}
