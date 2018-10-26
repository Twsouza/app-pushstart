import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonFeedbackComponent } from './button-feedback.component';

describe('ButtonFeedbackComponent', () => {
  let component: ButtonFeedbackComponent;
  let fixture: ComponentFixture<ButtonFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
