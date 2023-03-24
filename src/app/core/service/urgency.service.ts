import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrgencyService {

  constructor(private http: HttpClient) { }
  getUrgencies():Observable<String[]>{
    return this.http.get<String[]>('http://localhost:8080/urgencies')
  }
}
