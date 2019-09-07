import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';

import { RelationshipDataService } from '../relationship-data.service';
import { TasksService } from '../tasks.service';
import { Card } from '../card';
import { Member } from '../member';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent {

  card: Card;
  deletedCard: Card;
  cardForm: FormGroup;
  editMode: boolean = false;
  newMode: boolean = false;
  createdCard = null;

  memberCtrl = new FormControl();
  filteredMembers: Observable<Member[]>;

  statusList;
  prioritiesList;
  membersList;


  constructor(
    public dialog: MatDialog,
    public relationshipService: RelationshipDataService,
    public tasksService: TasksService,
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
  ) { 
    this.editMode = data["editMode"];
    this.newMode = data["newMode"];
    this.card = data["card"];
    this.createForm();

    this.statusList = this.relationshipService.getStatusList();
    this.membersList = this.relationshipService.getMembersList();
    this.prioritiesList = this.relationshipService.getPrioritiesList();

    this.filteredMembers = this.memberCtrl.valueChanges
      .pipe(
        startWith(''),
        map(member => member ? this._filterMembers(member) : this.membersList.slice())
      );
  }

  createForm() {
    this.cardForm = this.fb.group({
      status_id: this.card.status_id,
      title: this.card.title,
      description: this.card.description,
      priority_id: this.card.priority_id
    })
    this.memberCtrl.setValue(this.card.member)
  }

  openConfirmDialog() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      panelClass: 'confirm-dialog',
      autoFocus: false,
      data: {
        card: this.card
      }
    })
    dialogRef.afterClosed()
    .subscribe(() => {
      this.deletedCard = dialogRef.componentInstance.deletedCard;
      if(this.deletedCard) {
        this.dialogRef.close()
      }
    });
  }

  onSubmit() {
    let memberId = this.validateMember()
    if(memberId && this.cardForm.status === "VALID") {
      let taskData = this.cardForm.value;
      taskData["member_id"] = memberId;
      this.tasksService.create(taskData).then(res => {
        this.createdCard = res;
        this.dialogRef.close()
      }).catch(err => {
        if(err['status'] == 422) {
          console.error("ERRO 422")
        }
      });
    }
  }

  private _filterMembers(value: string): Member[] {
    const filterValue = value.toLowerCase();

    return this.membersList.filter(member => member.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private validateMember() {
    let memberId = null
    this.membersList.forEach(member => {
      if(this.memberCtrl.value && this.memberCtrl.value.trim() === member["name"]) {
        memberId = member["id"];
      }
    });
    memberId == null ? this.memberCtrl.setValue("") : false;
    return memberId;
  }

}
