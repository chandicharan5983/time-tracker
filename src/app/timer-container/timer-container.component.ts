import { Component, OnInit } from '@angular/core';
import { TimeTracker } from '../models/time-tracker.model';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-timer-container',
  templateUrl: './timer-container.component.html',
  styleUrls: ['./timer-container.component.scss'],
})
export class TimerContainerComponent implements OnInit {
  formDialog: boolean = false;
  newTimer: TimeTracker = {
    id: 0,
    name: '',
    history: [
      'No History Found, Click on the start button to track the timer.',
    ],
    timer: '00:00:00',
    actionBottom: 0,
    startTime: 0,
    endTime: 0,
  };

  timeTrackers: Array<TimeTracker> = [];

  constructor(private timerService: TimerService) {}

  ngOnInit() {
    this.timeTrackers = JSON.parse(localStorage.getItem('stopwatch') ?? '[]');
  }

  onDeleteTracker(id: number): void {
    this.timeTrackers = this.timeTrackers.filter((item) => item.id !== id);
    localStorage.setItem('stopwatch', JSON.stringify(this.timeTrackers));
  }

  openStringInputDialog(): void {
    this.formDialog = !this.formDialog;
  }

  onStringSubmitted(inputString: string): void {
    let timer: TimeTracker = {
      id: 0,
      name: '',
      history: [
        'No History Found, Click on the start button to track the timer.',
      ],
      timer: '00:00:00',
      actionBottom: 0,
      startTime: 0,
      endTime: 0,
    };
    timer.id = this.timerService?.getCurrentTime()?.timestamp;
    timer.name = inputString;
    this.timeTrackers.unshift(timer);
    localStorage.setItem('stopwatch', JSON.stringify(this.timeTrackers));
  }

  trackerAction(event: TimeTracker) {
    let timer: TimeTracker = {
      id: 0,
      name: '',
      history: [
        'No History Found, Click on the start button to track the timer.',
      ],
      timer: '00:00:00',
      actionBottom: 0,
      startTime: 0,
      endTime: 0,
    };
    const index = this.timeTrackers.findIndex(
      (el: TimeTracker) => el?.id === event?.id
    );
    if (index >= 0) {
      this.timeTrackers[index] = this.timerService?.getUpdatedTimer(
        this.timeTrackers[index]
      );
    }
    localStorage.setItem('stopwatch', JSON.stringify(this.timeTrackers));
  }

  // getCurrentTime(time?: any) {
  //   const currentDate = time ? new Date(time) : new Date();
  //   const hours = currentDate.getHours();
  //   const minutes = currentDate.getMinutes();
  //   const seconds = currentDate.getSeconds();

  //   const formattedTime = `${String(hours).padStart(2, '0')}:${String(
  //     minutes
  //   ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  //   const timeDetails = {
  //     timestamp: currentDate?.getTime(),
  //     getDate: this.formatDateToDDMMYYYY(currentDate),
  //     currentTime: formattedTime,
  //   };
  //   return timeDetails;
  // }

  // formatDateToDDMMYYYY(date: Date) {
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const year = date.getFullYear();

  //   return `${day}/${month}/${year}`;
  // }

  // getUpdatedTimer(timer: TimeTracker) {
  //   let history = [];
  //   if (!timer?.actionBottom) {
  //     timer.startTime = this.timerService?.getCurrentTime()?.timestamp;
  //     const historyString = `Started the timer at ${
  //       this.timerService?.getCurrentTime()?.getDate
  //     } ${this.timerService?.getCurrentTime()?.currentTime}`;
  //     if (
  //       timer.history.includes(
  //         'No History Found, Click on the start button to track the timer.'
  //       )
  //     ) {
  //       timer.history.pop();
  //     }
  //     timer.history.unshift(historyString);
  //     timer.actionBottom = 1;
  //   } else {
  //     timer.endTime = this.timerService?.getCurrentTime()?.timestamp;
  //     const historyString = `Started the timer at ${
  //       this.timerService?.getCurrentTime(timer.startTime)?.getDate
  //     } ${
  //       this.timerService?.getCurrentTime(timer.startTime)?.currentTime
  //     } & Stopped at ${this.timerService?.getCurrentTime()?.getDate} ${
  //       this.timerService?.getCurrentTime()?.currentTime
  //     }`;
  //     timer.history.unshift(historyString);
  //     timer.actionBottom = 0;
  //   }
  //   return timer;
  // }
}
