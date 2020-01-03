import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementComponent } from './agreement.component';
import { HttpClientModule } from '@angular/common/http';
import { Agreement } from './agreement.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('AgreementComponent', () => {
  let component: AgreementComponent;
  let fixture: ComponentFixture<AgreementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementComponent ],
      imports: [ HttpClientModule, RouterTestingModule ] 
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementComponent);
    component = fixture.componentInstance;
    component.agreement = {client: {}, agreementType: {}} as Agreement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
