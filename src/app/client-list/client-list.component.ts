import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client.model';
import { ClientService } from '../client/client.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clientList: Client[] = [];

  sortType = 'surname';
  sortReverse = false;
  searchClient: string;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.getClientsData();
  }

  fetchData(clients: Client[]){
    this.clientList = clients;
  }

  getClientsData(){
    this.clientService.getClients(this.sortType, this.sortReverse, this.searchClient).subscribe(res => this.fetchData(res))
  }

  sort(columnName: string){
    if (this.sortType === columnName){
      this.sortReverse = !this.sortReverse;
    }
    this.sortType = columnName;
    this.getClientsData();
  }

  getDetails(client:Client): void{
    this.router.navigateByUrl("/client/"+client.uuid);
  }

  
}
