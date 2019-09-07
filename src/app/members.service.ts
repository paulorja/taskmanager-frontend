import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private membersUrl = 'http://localhost:3000/members';
  public membersList;

  constructor(private http: HttpClient) { }

  getMembers() {
    return this.http.get(this.membersUrl)
  }

}
