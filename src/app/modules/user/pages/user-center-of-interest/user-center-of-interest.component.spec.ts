import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCenterOfInterestComponent } from './user-center-of-interest.component';

describe('UserCenterOfInterestComponent', () => {
  let component: UserCenterOfInterestComponent;
  let fixture: ComponentFixture<UserCenterOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCenterOfInterestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserCenterOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
