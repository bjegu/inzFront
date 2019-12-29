import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ClientService } from './client/client.service';
import { AgreementComponent } from './agreement/agreement.component';
import { AgreementListComponent } from './agreement-list/agreement-list.component';
import { AgreementService } from './agreement/agreement.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientFormComponent } from './client-form/client-form.component';
import { DigitOnlyModule } from '@uiowa/digit-only';

import {NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule, NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { AgreementFormComponent } from './agreement-form/agreement-form.component';
import { PagerComponent } from './shared/pager/pager.component';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ConfirmationWindowComponent } from './confirmation-window/confirmation-window.component';
import { EditFormComponent } from './edit-form/edit-form.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalednarDatePickerComponent } from './calendar/calendar-date-picker/calednar-date-picker.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    ClientListComponent,
    AgreementComponent,
    AgreementListComponent,
    ClientFormComponent,
    AgreementFormComponent,
    PagerComponent,
    ClientDetailsComponent,
    CalendarComponent,
    ConfirmationWindowComponent,
    EditFormComponent,
    CalednarDatePickerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DigitOnlyModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    NgbModalModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  providers: [
    ClientService,
    AgreementService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationWindowComponent]
})
export class AppModule { }
