import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from './client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiGeneral ='http://localhost:4200/api/';
  clientSuffix = 'client/';

  constructor(private httpClient: HttpClient) { }

  getClients():Observable<Client[] >{
    return this.httpClient.get<Client[]>(this.apiGeneral+this.clientSuffix)
  }

  postClient(client: Client):Observable<Client>{
    return this.httpClient.post<Client>(this.apiGeneral+this.clientSuffix, client)
  }
}
