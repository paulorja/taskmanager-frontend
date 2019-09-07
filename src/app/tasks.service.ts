import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksUrl = 'http://localhost:3000/tasks'

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.tasksUrl)
  }

}
