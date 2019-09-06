import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormGroupName } from '@angular/forms'

import { FormControl } from '@angular/forms'

import { Card } from '../card';
import { Member } from '../member';

@Component({
  selector: 'app-card-dialog',
  templateUrl: './card-dialog.component.html',
  styleUrls: ['./card-dialog.component.css']
})
export class CardDialogComponent {

  card: Card;
  cardForm: FormGroup;
  editMode: boolean = false;
  newMode: boolean = false;

  memberCtrl = new FormControl();
  filteredMembers: Observable<Member[]>;
  members: Member[] = [
    {
      name: 'Arkansas',
      imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];


  constructor(
    public dialogRef: MatDialogRef<CardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder
  ) { 
    this.editMode = data["editMode"];
    this.newMode = data["newMode"];
    this.card = data["card"];
    this.createForm();

    console.log(this.cardForm.value)

    this.filteredMembers = this.memberCtrl.valueChanges
      .pipe(
        startWith(''),
        map(member => member ? this._filterMembers(member) : this.members.slice())
      );
  }

  createForm() {
    this.cardForm = this.fb.group({
      status: this.card.status,
      title: this.card.title,
      priority: this.card.priority
    })
    this.memberCtrl.setValue(this.card.member)
  }

  onSubmit(formData) {
    console.log(this.cardForm.value)
    console.log("formData: " + formData);
  }

  private _filterMembers(value: string): Member[] {
    const filterValue = value.toLowerCase();

    return this.members.filter(member => member.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
