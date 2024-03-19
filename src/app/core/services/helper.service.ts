import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  loader = new BehaviorSubject<any>(null);

  constructor() { }
}
