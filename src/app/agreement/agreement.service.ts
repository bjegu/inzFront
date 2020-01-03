import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Agreement, AgreementType } from './agreement.model';
import { Observable } from 'rxjs';
import { Page } from '../shared/page.model';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../security/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AgreementService {

  apiGeneral = environment.apiUrl;
  agreementSuffix = 'agreement/';

  constructor(private httpClient: HttpClient, private authService: AuthenticationService) { }

  getAgreement(page: number):Observable<Page<Agreement>>{
    const params = new HttpParams().set('page', String(Number(page)-1))
    if (this.authService.hasAdminAuthority()) {
      return this.httpClient.get<Page<Agreement>>(this.apiGeneral+this.agreementSuffix, {params})
    }
    return this.httpClient.get<Page<Agreement>>(this.apiGeneral + this.agreementSuffix + 'client', {params})
  }

  postAgreement(agreement: Agreement): Observable<Agreement> {
    return this.httpClient.post<Agreement>(this.apiGeneral + this.agreementSuffix, agreement);
  }

  deleteAgreement(id: String):Observable<Agreement>{
    return this.httpClient.delete<Agreement>(this.apiGeneral+this.agreementSuffix+'delete/'+id)
  }

  getAgreementType():Observable<AgreementType[]>{
    return this.httpClient.get<AgreementType[]>(this.apiGeneral+'agrtype/showall')
  }

}
