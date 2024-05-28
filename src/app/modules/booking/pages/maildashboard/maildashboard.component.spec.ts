import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaildashboardComponent } from './maildashboard.component';

describe('MaildashboardComponent', () => {
  let component: MaildashboardComponent;
  let fixture: ComponentFixture<MaildashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MaildashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MaildashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
