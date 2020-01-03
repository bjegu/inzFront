import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementListComponent } from './agreement-list.component';
import { FormsModule } from '@angular/forms';
import { AgreementComponent } from '../agreement/agreement.component';
import { PagerComponent } from '../shared/pager/pager.component';
import { HttpClientModule } from '@angular/common/http';

describe('AgreementListComponent', () => {
  let component: AgreementListComponent;
  let fixture: ComponentFixture<AgreementListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementListComponent, AgreementComponent, PagerComponent ],
      imports: [ FormsModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
