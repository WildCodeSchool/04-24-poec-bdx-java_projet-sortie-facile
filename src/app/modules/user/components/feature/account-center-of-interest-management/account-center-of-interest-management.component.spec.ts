import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCenterOfInterestManagementComponent } from './account-center-of-interest-management.component';

describe('AccountCenterOfInterestManagementComponent', () => {
  let component: AccountCenterOfInterestManagementComponent;
  let fixture: ComponentFixture<AccountCenterOfInterestManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountCenterOfInterestManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountCenterOfInterestManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
