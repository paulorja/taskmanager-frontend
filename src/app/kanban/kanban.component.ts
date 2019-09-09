import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RelationshipDataService } from '../relationship-data.service'
import { TasksService } from '../tasks.service'
import { StatusService } from '../status.service'
import { PrioritiesService } from '../priorities.service'
import { MembersService } from '../members.service'
import { Card } from '../card';
import { LoadingSnackbarComponent } from '../loading-snackbar/loading-snackbar.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  statusList: any[] = null
  dragDisabled: boolean = false

  constructor(
    private _snackBar: MatSnackBar,
    private relationshipService: RelationshipDataService,
    private statusService: StatusService,
    private membersService: MembersService,
    private prioritiesService: PrioritiesService,
    private tasksService: TasksService 
  ) { }

  ngOnInit() {
    this.getStatusList()
    this.getMembersList()
    this.getPrioritiesList()
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.requestMoveCard(event);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.requestTransferCard(event);
    }
  }

  private

  changeCardList(card: Card) {
    this.statusList.forEach(s => {
      if(s["id"] === card.status_id) {
        s["cards"].push(card)
      }
    });
  }

  getListConnections(status) {
    let connections = []
    this.statusList.forEach(s => {
      if(s['name'] != status['name']) {
        connections.push(s['name'])
      }
    })
    return connections
  }

  getMembersList() {
    this.membersService.getMembers().subscribe(priorities => {
      this.relationshipService.setMembersList(priorities);
    });
  }

  getPrioritiesList() {
    this.prioritiesService.getPriorities().subscribe(priorities => {
      this.relationshipService.setPrioritiesList(priorities);
    });
  }

  getStatusId(statusName) {
    let found = false;
    this.statusList.forEach(s => {
      if(statusName === s["name"]) {
        found = s["id"];
      }
    });
    return found;
  }

  getStatusList() {
    this.statusService.getStatus().subscribe(status => {
      this.relationshipService.setStatusList(status);
      this.statusList = [];
      status.forEach(s => {
        s['cards'] = [];
        this.statusList.push(s);
      });
      this.getCards();
    });
  }

  getCards() {
    this.tasksService.getTasks().subscribe(tasks => {
      tasks.forEach(t => {
        this.statusList.forEach(s => {
          if(t['status_id'] == s['id']) {
            let card = new Card(
              t['id'],
              t['status_id'],
              t['title'],
              t['description'],
              t['member_id'],
              t['date'],
              t['priority_id'])
            s['cards'].push(card)
          }
        });
      });
    });
  }

  requestMoveCard(event) {
    this.dragDisabled = true;
    let snackRef = this._snackBar.openFromComponent(LoadingSnackbarComponent);
    const taskId = event.container.data[event.currentIndex]["id"];
    this.tasksService.move(taskId, event.currentIndex + 1).then(res => {
      this.dragDisabled = false;
      snackRef.dismiss()
    }).catch(err => {
      console.error(err);
      this.dragDisabled = false;
      snackRef.dismiss()
    });
  }

  requestTransferCard(event) {
    let statusId = this.getStatusId(event.container.id);
    if(statusId) {
      this.dragDisabled = true;
      let snackRef = this._snackBar.openFromComponent(LoadingSnackbarComponent);
      const taskId = event.container.data[event.currentIndex]["id"];
      this.tasksService.transfer(taskId, event.currentIndex + 1, statusId).then(res => {
        this.dragDisabled = false;
        snackRef.dismiss()
        this.statusList.forEach(s => {
          s["cards"].forEach(c => {
            if(c["id"] == res["id"]) {
              c["status_id"] = res["status_id"];
            }
          });
        });
      }).catch(err => {
        console.error(err);
        this.dragDisabled = false;
        snackRef.dismiss()
      });
    }
  }

}