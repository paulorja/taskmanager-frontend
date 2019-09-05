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
    card.status = this.statusId

    this.dialog.open(CardDialogComponent, {
      width: '400px',
      data: { 
        editMode: true,
        newMode: true,
        card: card
      }
    });
  }

}
