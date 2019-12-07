import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agreement } from './agreement.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  apiGeneral = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAgreement():Observable<Agreement[]>{
    return this.httpClient.get<Agreement[]>(this.apiGeneral+'agreement/')
  }

  deleteAgreement():Observable<Agreement>{
    return this.httpClient.delete<Agreement>(this.apiGeneral+ 'agreement/delete/{id}')
  }

}
