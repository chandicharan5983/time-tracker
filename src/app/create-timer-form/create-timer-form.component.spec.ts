import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTimerFormComponent } from './create-timer-form.component';

describe('CreateTimerFormComponent', () => {
  let component: CreateTimerFormComponent;
  let fixture: ComponentFixture<CreateTimerFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTimerFormComponent]
    });
    fixture = TestBed.createComponent(CreateTimerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
