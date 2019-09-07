import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private statusUrl = 'http://localhost:3000/status'

  constructor(private http: HttpClient) { }

  getStatus() {
    return this.http.get(this.statusUrl)
  }

}
