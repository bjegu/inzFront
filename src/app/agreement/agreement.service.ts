import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Agreement, AgreementType } from './agreement.model';
import { Observable } from 'rxjs';
import { Page } from '../shared/page.model';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  apiGeneral ='http://localhost:4200/api/';
  agreementSuffix = 'agreement/';

  constructor(private httpClient: HttpClient) { }

  getAgreement(page: number):Observable<Page<Agreement>>{
    const params = new HttpParams().set('page', String(Number(page)-1))
    return this.httpClient.get<Page<Agreement>>('http://localhost:4200/api/agreement/', {params})
  }

  postAgreement(agreement:Agreement):Observable<Agreement>{
    return this.httpClient.post<Agreement>(this.apiGeneral+this.agreementSuffix, agreement);
  }

  deleteAgreement():Observable<Agreement>{
    return this.httpClient.delete<Agreement>('http://localhost:4200/api/agreement/delete/{id}')
  }

  getAgreementType():Observable<AgreementType[]>{
    return this.httpClient.get<AgreementType[]>('http://localhost:4200/api/agrtype/showall')
  }

}
