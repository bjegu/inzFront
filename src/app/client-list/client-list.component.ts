import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client.model';
import { ClientService } from '../client/client.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clientList: Client[] = [];

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(res => this.fetchData(res))
  }

  fetchData(clients: Client[]){
    this.clientList = clients;
  }

}
