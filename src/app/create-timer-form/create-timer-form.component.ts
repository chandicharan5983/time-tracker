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
    // Emit the input string to the parent component
    this.stringSubmitted.emit(this.inputString);

    // Reset the input field
    this.inputString = '';

    // Close the dialog (implement dialog closing logic)
    this.closeDialog();
  }

  onClose(): void {
    // Close the dialog (implement dialog closing logic)
    this.closeDialog();
  }

  private closeDialog(): void {
    this.closeCreateForm.emit();
  }
}
