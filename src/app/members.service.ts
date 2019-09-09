import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private membersUrl = 'https://still-atoll-35576.herokuapp.com/members';
  public membersList;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get(this.membersUrl)
  }

}
