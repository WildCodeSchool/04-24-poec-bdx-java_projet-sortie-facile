import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountNotifManagementComponent } from './account-notif-management.component';

describe('AccountNotifManagementComponent', () => {
  let component: AccountNotifManagementComponent;
  let fixture: ComponentFixture<AccountNotifManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountNotifManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountNotifManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
