import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationshipDataService {

  private statusList;
  private membersList;
  private prioritiesList;

  constructor() { }

  setStatusList(statusList) {
    this.statusList = statusList;
  }

  getStatusList() {
    return this.statusList;
  }

  setMembersList(membersList) {
    this.membersList = membersList;
  }

  getMembersList() {
    return this.membersList;
  }

  setPrioritiesList(prioritiesList) {
    this.prioritiesList = prioritiesList;
  }

  getPrioritiesList() {
    return this.prioritiesList;
  }

}
