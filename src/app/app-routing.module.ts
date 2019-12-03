import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { AgreementComponent } from './agreement/agreement.component';
import { ClientListComponent } from './client-list/client-list.component';
import { AgreementListComponent } from './agreement-list/agreement-list.component';


const routes: Routes = [
  // {path: 'client/:id', component: ClientComponent},
  // {path: 'agreement/:id', component: AgreementComponent},
  {path: 'clientList', component: ClientListComponent},
  {path: 'agreementList', component:AgreementListComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
