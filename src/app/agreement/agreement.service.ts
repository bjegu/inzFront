import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Agreement } from './agreement.model';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../security/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  apiGeneral = 'http://localhost:4200/api/';
  agreementSuffix = 'agreement/';

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getAgreement(): Observable<Agreement[]> {
    if (this.authService.hasAdminAuthority()) {
      return this.httpClient.get<Agreement[]>(this.apiGeneral + this.agreementSuffix)
    }
    return this.httpClient.get<Agreement[]>(this.apiGeneral + this.agreementSuffix + 'client')
  }

  postAgreement(agreement: Agreement): Observable<Agreement> {
    return this.httpClient.post<Agreement>(this.apiGeneral + this.agreementSuffix, agreement);
  }

  deleteAgreement(): Observable<Agreement> {
    return this.httpClient.delete<Agreement>(this.apiGeneral + this.agreementSuffix + 'delete/{id}')
  }

}
