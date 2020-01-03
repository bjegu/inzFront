import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementFormComponent } from './agreement-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AgreementFormComponent', () => {
  let component: AgreementFormComponent;
  let fixture: ComponentFixture<AgreementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementFormComponent ],
      imports: [FormsModule, ReactiveFormsModule, NgbModule, HttpClientModule, RouterModule, RouterTestingModule ]
    }) 
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
