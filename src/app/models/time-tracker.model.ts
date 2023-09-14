export interface TimeTracker {
  id: number;
  name: string;
  history: string[];
  timer: string;
  actionBottom: string | number;
  startTime: number;
  endTime?: number;
}
