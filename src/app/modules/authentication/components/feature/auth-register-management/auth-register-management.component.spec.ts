import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthRegisterManagementComponent } from './auth-register-management.component';

describe('AuthRegisterManagementComponent', () => {
  let component: AuthRegisterManagementComponent;
  let fixture: ComponentFixture<AuthRegisterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthRegisterManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthRegisterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
