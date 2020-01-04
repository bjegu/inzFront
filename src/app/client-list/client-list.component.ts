import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client.model';
import { ClientService } from '../client/client.service';
import { Router } from '@angular/router';
import { Page } from '../shared/page.model';


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
  totalPages: number;
  page = 1;

  constructor(private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    this.changePage(this.page);
  }

  fetchData(page: Page<Client>){
    this.clientList = page.content;
    this.totalPages = page.totalPages
  }

  // getClientsData(){
  //   this.clientService.getClients(this.sortType, this.sortReverse, this.searchClient).subscribe(res => this.fetchData(res))
  // }

  changePage(page: number){
    console.log(page);
    this.page = page;
    this.clientService.getClients(page, this.sortType, this.sortReverse, this.searchClient).subscribe(res => this.fetchData(res))
  }

  sort(columnName: string){
    if (this.sortType === columnName){
      this.sortReverse = !this.sortReverse;
    }
    this.sortType = columnName;
    this.changePage(this.page);
  }

  getDetails(client:Client): void{
    this.router.navigateByUrl("/client/"+client.uuid);
  }

  
}
