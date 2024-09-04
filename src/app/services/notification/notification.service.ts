import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {NotificationType} from '../../interfaces';

interface Notification {
  type: NotificationType;
  message: string
}
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  notification$ = this.notificationSubject.asObservable();

  show(type: NotificationType, message: string) {
    this.notificationSubject.next({type, message});
  }
}
