import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-create-timer-form',
  templateUrl: './create-timer-form.component.html',
  styleUrls: ['./create-timer-form.component.scss'],
})
export class CreateTimerFormComponent {
  @Output() stringSubmitted = new EventEmitter<string>();
  @Output() closeCreateForm = new EventEmitter<string>();
  inputString: string = '';

  onSubmit(): void {
    this.stringSubmitted.emit(this.inputString);
    this.inputString = '';
    this.closeDialog();
  }

  onClose(): void {
    this.closeDialog();
  }

  private closeDialog(): void {
    this.closeCreateForm.emit();
  }
}
