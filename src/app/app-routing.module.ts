import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { AgreementListComponent } from './agreement-list/agreement-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { AgreementFormComponent } from './agreement-form/agreement-form.component';
import { ClientDetailsComponent } from './client-details/client-details.component';


const routes: Routes = [
 {path: 'client/:id', component: ClientDetailsComponent},
  // {path: 'agreement/:id', component: AgreementComponent},
  {path: 'clientList', component: ClientListComponent},
  {path: 'agreementList', component:AgreementListComponent},
  {path: 'addClient', component:ClientFormComponent},
  {path: 'addAgreement', component:AgreementFormComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
