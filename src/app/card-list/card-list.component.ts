import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {

  @Input() title
  @Input() listId 
  @Input() cards
  @Input() connectedTo

  @Output() evtDrop = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  drop(event) {
    this.evtDrop.emit(event)
  }

  addCard() {
    console.log("oi")
    this.cards.push("foo")
  }

}
