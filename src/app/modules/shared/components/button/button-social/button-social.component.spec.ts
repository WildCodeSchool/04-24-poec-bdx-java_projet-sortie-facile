import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonSocialComponent } from './button-social.component';

describe('ButtonSocialComponent', () => {
  let component: ButtonSocialComponent;
  let fixture: ComponentFixture<ButtonSocialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonSocialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
