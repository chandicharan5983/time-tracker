import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { TimeTracker } from '../models/time-tracker.model';
import { Subscription, interval } from 'rxjs';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-list',
  templateUrl: './timer-list.component.html',
  styleUrls: ['./timer-list.component.scss'],
})
export class TimerListComponent implements OnInit, OnDestroy {
  timeTracker!: TimeTracker;

  @Input('timeTracker') set settimeTracker(time: TimeTracker) {
    this.timeTracker = time;

    if (this.timeTracker.actionBottom) {
      this.setTimerUpdate();
    }
  }
  @Output()
  deleteTracker = new EventEmitter<number>();
  @Output() trackerAction = new EventEmitter<TimeTracker>();

  displayTime: string = '00:00:00';
  private timerSubscription!: Subscription;

  constructor(private timerService: TimerService) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  setTimerUpdate() {
    this.timerSubscription = interval(1000).subscribe(() => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - this.timeTracker.startTime;

      this.displayTime = this.timerService?.formatElapsedTime(elapsedTime);
    });
  }

  onDelete(): void {
    this.deleteTracker.emit(this.timeTracker.id);
  }

  timerAction(event: TimeTracker) {
    if (this.timeTracker.actionBottom) {
      this.timerSubscription.unsubscribe();
      this.displayTime = '00:00:00';
    } else {
      this.setTimerUpdate();
    }
    this.trackerAction.emit(event);
  }
}
