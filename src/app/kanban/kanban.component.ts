import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Card } from '../card';
import { TasksService } from '../tasks.service'
import { StatusService } from '../status.service'
import { PrioritiesService } from '../priorities.service'
import { MembersService } from '../members.service'
import { RelationshipDataService } from '../relationship-data.service'

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  statusList = null
  dragDisabled = false

  constructor(
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
      this.dragDisabled = true;
      const taskId = event.container.data[event.currentIndex]["id"]
      this.tasksService.move(taskId, event.currentIndex + 1).then(res => {
        this.dragDisabled = false;
      }).catch(err => {
        console.error(err)
        this.dragDisabled = false;
      });

    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  private

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

  getStatusList() {
    this.statusService.getStatus().subscribe(status => {
      this.relationshipService.setStatusList(status);
      this.statusList = []
      status.forEach(s => {
        s['cards'] = []
        this.statusList.push(s)
      });
      this.getCards()
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
              t['description'])
            s['cards'].push(card)
          }
        });
      });
    });
  }

}