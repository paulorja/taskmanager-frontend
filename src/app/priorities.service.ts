import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PrioritiesService {

  private prioritiesUrl = 'https://still-atoll-35576.herokuapp.com/priorities';
  public prioritiesList;

  constructor(private http: HttpClient) { }

  getPriorities() {
    return this.http.get(this.prioritiesUrl)
  }

}
