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

      this.displayTime = this.formatElapsedTime(elapsedTime);
    });
  }

  private formatElapsedTime(elapsedTime: number): string {
    const seconds = Math.floor(elapsedTime / 1000);
    const hh = Math.floor(seconds / 3600);
    const mm = Math.floor((seconds % 3600) / 60);
    const ss = seconds % 60;
    return `${this.formatDigit(hh)}:${this.formatDigit(mm)}:${this.formatDigit(
      ss
    )}`;
  }

  private formatDigit(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
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
