import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthTypographyWithRedirectComponent } from './auth-typography-with-redirect.component';

describe('AuthTypographyWithRedirectComponent', () => {
  let component: AuthTypographyWithRedirectComponent;
  let fixture: ComponentFixture<AuthTypographyWithRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthTypographyWithRedirectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthTypographyWithRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
