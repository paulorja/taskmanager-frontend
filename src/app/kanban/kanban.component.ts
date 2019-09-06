import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Card } from '../card';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  todo = [
    new Card("1", "Task 1", "foo bar 1","","https://static.vecteezy.com/system/resources/previews/000/420/553/non_2x/avatar-icon-vector-illustration.jpg"),
    new Card("1", "Task 2", "foo bar 2"),
    new Card("1", "Fazer bolo de cenoura", "foo bar 2"),
    new Card("1", "Passar nos correios e depois levar até o shopping", "foo bar 2")
  ];

  doing = [

  ]

  done = [
    new Card("3", "Task 3", "foo bar 3"),
  ];

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}