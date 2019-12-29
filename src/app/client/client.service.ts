import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Client } from './client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiGeneral ='http://localhost:4200/api/';
  clientSuffix = 'client/';

  constructor(private httpClient: HttpClient) { }

  getClients(sortBy: string, sortReverse: boolean, searchClient: string):Observable<Client[] >{
    let params;
    if (searchClient!=null) {
      params = new HttpParams().set('sort', sortBy).set('order', sortReverse?'desc':'asc').set('search', searchClient);
    } else{
      params = new HttpParams().set('sort', sortBy).set('order', sortReverse?'desc':'asc')
    }
    return this.httpClient.get<Client[]>(this.apiGeneral+this.clientSuffix,{params})
  }

  postClient(client: Client):Observable<Client>{
    return this.httpClient.post<Client>(this.apiGeneral+this.clientSuffix, client)
  }
  
  getClientById(id: String):Observable<Client>{
    return this.httpClient.get<Client>(this.apiGeneral+this.clientSuffix+id);
  }

  deleteClient(id: String):Observable<Client>{
    return this.httpClient.delete<Client>(this.apiGeneral+this.clientSuffix+'delete/'+id);
  }
}
