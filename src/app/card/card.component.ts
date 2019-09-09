import { Component, OnInit, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { CardDialogComponent } from '../card-dialog/card-dialog.component';

import { Card } from '../card';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  card: Card;

  @Output()
  delete: EventEmitter<Card> = new EventEmitter();

  @Output()
  update: EventEmitter<Card> = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {

  }

  openDialog() {
    let dialogRef = this.dialog.open(CardDialogComponent, {
      width: '430px',
      panelClass: 'card-dialog',
      autoFocus: false,
      data: {
          editMode: false,
          newMode: false,
          card: this.card
        }
    });
    dialogRef.afterClosed()
    .subscribe(() => {
      let deletedCard = dialogRef.componentInstance.deletedCard;
      this.delete.emit(deletedCard);

      let updatedCard = dialogRef.componentInstance.updatedCard;
      this.update.emit(updatedCard);
    });
  }

}