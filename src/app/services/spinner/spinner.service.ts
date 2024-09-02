import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerSubject = new Subject<boolean>();
  loading$ = this.spinnerSubject.asObservable();

  show() {
    this.spinnerSubject.next(true);
  }

  hide() {
    this.spinnerSubject.next(false);
  }
}
