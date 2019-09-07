import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CardDialogComponent } from '../card-dialog/card-dialog.component';

import { Card } from '../card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  card: Card 

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    // console.log(this.card)
  }

  openDialog() {
    let dialogRef = this.dialog.open(CardDialogComponent, {
      width: '400px',
      panelClass: 'card-dialog',
      data: {
          editMode: false,
          newMode: false,
          card: this.card
        }
    });
  }

}