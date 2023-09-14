import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TimeTracker } from '../models/time-tracker.model';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
})
export class TimerListComponent {
  @Input() timeTracker!: TimeTracker;
  @Output() deleteTracker = new EventEmitter<number>();
  @Output() trackerAction = new EventEmitter<TimeTracker>();

  onDelete(): void {
    this.deleteTracker.emit(this.timeTracker.id);
  }

  timerAction(event: TimeTracker) {
    this.trackerAction.emit(event);
  }
}
