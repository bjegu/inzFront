import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agreement } from './agreement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  constructor(private httpClient: HttpClient) { }

  getAgreement():Observable<Agreement[]>{
    return this.httpClient.get<Agreement[]>('http://localhost:4200/api/agreement/')
  }

}
