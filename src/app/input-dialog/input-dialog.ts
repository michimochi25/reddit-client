import { Component, inject, model, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
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
    MatDialogClose,
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

  onSubmit(): void {
    this.service.getAbout(this.subreddit).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => console.error(error),
    });
  }
}
