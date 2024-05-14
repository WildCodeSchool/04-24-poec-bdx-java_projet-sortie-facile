import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoginManagementComponent } from './auth-login-management.component';

describe('AuthLoginManagementComponent', () => {
  let component: AuthLoginManagementComponent;
  let fixture: ComponentFixture<AuthLoginManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLoginManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthLoginManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
