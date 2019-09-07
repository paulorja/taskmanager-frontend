import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CardDialogComponent } from '../card-dialog/card-dialog.component';
import { Card } from '../card';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  @Input() title
  @Input() listId 
  @Input() statusId
  @Input() cards
  @Input() connectedTo

  @Output() evtDrop = new EventEmitter()

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  drop(event) {
    this.evtDrop.emit(event)
  }

  openCardDialog() {
    let card = new Card()
    card.status_id = String(this.statusId)
    card.priority_id = "1"
    // card.member = "Paulo"

    let dialogRef = this.dialog.open(CardDialogComponent, {
      width: '400px',
      panelClass: 'card-dialog',
      data: { 
        editMode: true,
        newMode: true,
        card: card
      }
    });
    dialogRef.afterClosed()
    .subscribe(() => {
      let c = dialogRef.componentInstance.createdCard
      let newCard = new Card(c["status_id"], c["title"], c["description"])
      this.cards.push(newCard)
    })
  }

}
