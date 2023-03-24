import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackPathService {

  feedbackPath = new BehaviorSubject<string>('') 

  constructor() { }
}
