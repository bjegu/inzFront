import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agreement } from './agreement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  apiGeneral ='http://localhost:4200/api/';
  agreementSuffix = 'agreement/';

  constructor(private httpClient: HttpClient) { }

  getAgreement():Observable<Agreement[]>{
    return this.httpClient.get<Agreement[]>('http://localhost:4200/api/agreement/')
  }

  postAgreement(agreement:Agreement):Observable<Agreement>{
    return this.httpClient.post<Agreement>(this.apiGeneral+this.agreementSuffix, agreement);
  }

  deleteAgreement():Observable<Agreement>{
    return this.httpClient.delete<Agreement>('http://localhost:4200/api/agreement/delete/{id}')
  }

}
