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
  @Input() dragDisabled = false
  @Input() connectedTo

  @Output() evtDrop = new EventEmitter()

  @Output()
  changeCardList: EventEmitter<Card> = new EventEmitter()

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  drop(event) {
    this.evtDrop.emit(event)
  }

  deleteFeedback(deletedCard: Card) {
    let index = this.cards.indexOf(deletedCard);
    index > -1 ? this.cards.splice(index, 1) : false;
  }

  updateFeedback(updatedCard: Card) {
    if(updatedCard) {
      this.cards.forEach(oldCard => {
        if(oldCard.id === updatedCard.id) {
          let index = this.cards.indexOf(oldCard)
          if(oldCard.status_id == updatedCard.status_id) {
            this.cards[index] = updatedCard;
          } else {
            index > -1 ? this.cards.splice(index, 1) : false;
            this.changeCardList.emit(updatedCard);
          }
          return;
        }
      });
    }
  }

  openCardDialog() {
    let card = new Card()
    card.status_id = this.statusId
    card.priority_id = 1

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
      if(c != null) {
        let newCard = new Card(
          c["id"],
          c["status_id"],
          c["title"],
          c["description"],
          c['member_id'],
          c['date'],
          c['priority_id'])
        this.cards.push(newCard)
        if(card.status_id != newCard.status_id) {
          this.changeCardList.emit(newCard);
          let index = this.cards.indexOf(newCard)
          index > -1 ? this.cards.splice(index, 1) : false;
        }
      }
    })
  }

}
