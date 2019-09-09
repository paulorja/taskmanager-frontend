import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Card } from '../card';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  card: Card;
  deletedCard = null;
  loading: boolean = false;

  constructor(
    public tasksService: TasksService,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { 
    this.card = data["card"];
  }

  cancel() {
    this.dialogRef.close();
  }

  confirm() {
    this.loading = true;
    this.tasksService.delete(this.card.id).then(res => {
      this.deletedCard = this.card;
      this.dialogRef.close();
    }).catch(err => {
      console.error(err);
    });
  }

}
