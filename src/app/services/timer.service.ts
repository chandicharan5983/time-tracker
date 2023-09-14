import { Injectable } from '@angular/core';
import { TimeTracker } from '../models/time-tracker.model';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  constructor() {}

  getCurrentTime(time?: any) {
    const currentDate = time ? new Date(time) : new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();

    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    const timeDetails = {
      timestamp: currentDate?.getTime(),
      getDate: this.formatDateToDDMMYYYY(currentDate),
      currentTime: formattedTime,
    };
    return timeDetails;
  }

  formatDateToDDMMYYYY(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  getUpdatedTimer(timer: TimeTracker) {
    let history = [];
    if (!timer?.actionBottom) {
      timer.startTime = this.getCurrentTime()?.timestamp;
      const historyString = `Started the timer at ${
        this.getCurrentTime()?.getDate
      } ${this.getCurrentTime()?.currentTime}`;
      if (
        timer.history.includes(
          'No History Found, Click on the start button to track the timer.'
        )
      ) {
        timer.history.pop();
      }
      timer.history.unshift(historyString);
      timer.actionBottom = 1;
    } else {
      timer.endTime = this.getCurrentTime()?.timestamp;
      const historyString = `Started the timer at ${
        this.getCurrentTime(timer.startTime)?.getDate
      } ${this.getCurrentTime(timer.startTime)?.currentTime} & Stopped at ${
        this.getCurrentTime()?.getDate
      } ${this.getCurrentTime()?.currentTime}`;
      timer.history.unshift(historyString);
      timer.actionBottom = 0;
    }
    return timer;
  }

  formatElapsedTime(elapsedTime: number): string {
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
}
