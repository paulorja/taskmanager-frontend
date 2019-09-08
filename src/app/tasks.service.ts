import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private tasksUrl = 'http://localhost:3000/tasks/'

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<any[]>(this.tasksUrl)
  }

  create(taskData) {
    return this.http
      .post(
        this.tasksUrl, JSON.stringify({
          task: taskData
        }), httpOptions)
      .toPromise();
  }

  update(taskId, taskData) {
    return this.http
      .put(
        this.tasksUrl + taskId, JSON.stringify({task: taskData}), httpOptions)
      .toPromise();
  }

  delete(taskId) {
    return this.http
      .delete(
        this.tasksUrl + taskId)
      .toPromise();
  }

  move(taskId, position) {
    return this.http
      .post(
        this.tasksUrl + taskId + "/move", JSON.stringify({
          position: position
        }), httpOptions)
      .toPromise();
  }

  transfer(taskId, position, statusId) {
    return this.http
      .post(
        this.tasksUrl + taskId + "/transfer", JSON.stringify({
          position: position,
          status_id: statusId
        }), httpOptions)
      .toPromise();
  }

}
