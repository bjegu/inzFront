import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { AgreementListComponent } from './agreement-list/agreement-list.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { AgreementFormComponent } from './agreement-form/agreement-form.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarFormComponent } from './calendar/calendar-form/calendar-form.component';
import { AdminGuardService } from './security/admin-guard.service';


const routes: Routes = [
 {path: 'client/:id', component: ClientDetailsComponent, canActivate: [AdminGuardService] },
  // {path: 'agreement/:id', component: AgreementComponent},
  {path: 'clientList', component: ClientListComponent, canActivate: [AdminGuardService]},
  {path: 'agreementList', component:AgreementListComponent},
  {path: 'userInfo', component: ClientDetailsComponent},
  {path: 'addClient', component:ClientFormComponent, canActivate: [AdminGuardService]},
  {path: 'addAgreement', component:AgreementFormComponent, canActivate: [AdminGuardService]},
  {path: 'calendar', component:CalendarComponent, canActivate: [AdminGuardService]},
  {path: 'addEvent', component:CalendarFormComponent, canActivate: [AdminGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
