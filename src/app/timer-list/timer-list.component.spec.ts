import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerListComponent } from './timer-list.component';

describe('TimerListComponent', () => {
  let component: TimerListComponent;
  let fixture: ComponentFixture<TimerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerListComponent]
    });
    fixture = TestBed.createComponent(TimerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
