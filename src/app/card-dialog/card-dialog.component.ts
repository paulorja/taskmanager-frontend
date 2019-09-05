import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Card } from '../card';


@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent {

  card: Card;
  editMode: boolean = false;
  newMode: boolean = false;
  

  selectedStatus = "2"

  constructor(
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.editMode = data["editMode"]
    this.newMode = data["newMode"]
    this.card = data["card"]
    console.log(this.card)
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
