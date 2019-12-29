import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { AgreementListComponent } from './agreement-list/agreement-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { AgreementFormComponent } from './agreement-form/agreement-form.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarFormComponent } from './calendar/calendar-form/calendar-form.component';


const routes: Routes = [
 {path: 'client/:id', component: ClientDetailsComponent},
  // {path: 'agreement/:id', component: AgreementComponent},
  {path: 'clientList', component: ClientListComponent},
  {path: 'agreementList', component:AgreementListComponent},
  {path: 'addClient', component:ClientFormComponent},
  {path: 'addAgreement', component:AgreementFormComponent},
  {path: 'calendar', component:CalendarComponent},
  {path: 'addEvent', component:CalendarFormComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
