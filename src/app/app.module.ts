import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClientService } from './client/client.service';
import { AgreementComponent } from './agreement/agreement.component';
import { AgreementListComponent } from './agreement-list/agreement-list.component';
import { AgreementService } from './agreement/agreement.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientFormComponent } from './client-form/client-form.component';
import { DigitOnlyModule } from '@uiowa/digit-only';

import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { AgreementFormComponent } from './agreement-form/agreement-form.component';
import { BasicAuthHtppInterceptorService } from './security/basic-http-auth.interceptor';
import { AuthenticationService } from './security/authentication.service';
import { AdminGuardService } from './security/admin-guard.service';
import { LoginFormComponent } from './login-form/login-form.component';


const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true },
];

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ClientListComponent,
    AgreementComponent,
    AgreementListComponent,
    ClientFormComponent,
    AgreementFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DigitOnlyModule,
    NgbPaginationModule
  ],
  providers: [
    ClientService,
    AgreementService,
    AuthenticationService,
    AdminGuardService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
