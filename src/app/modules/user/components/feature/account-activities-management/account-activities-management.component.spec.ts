import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountActivitiesManagementComponent } from './account-activities-management.component';

describe('AccountActivitiesManagementComponent', () => {
  let component: AccountActivitiesManagementComponent;
  let fixture: ComponentFixture<AccountActivitiesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountActivitiesManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountActivitiesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
