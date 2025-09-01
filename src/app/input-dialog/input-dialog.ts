import { Component, inject, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { GetAbout } from '../get-about';

export interface DialogData {
  subreddit: string;
}

@Component({
  selector: 'app-input-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './input-dialog.html',
  styleUrls: ['./input-dialog.css'],
})
export class InputDialog {
  readonly dialogRef = inject(MatDialogRef<InputDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly subreddit = this.data.subreddit;

  constructor(private service: GetAbout) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    try {
      const res = await this.service.getAbout(this.subreddit);

      const dataToCloseWith = {
        key: this.subreddit,
        data: res.data.children,
      };

      // pass the complete object to the parent
      this.dialogRef.close(dataToCloseWith);
    } catch (error) {
      alert('Subreddit not found or an error occurred.');
      this.dialogRef.close();
    }
  }
}
