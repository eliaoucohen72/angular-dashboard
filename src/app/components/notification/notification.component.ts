import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent implements OnInit, OnDestroy {
  message: string | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription.add(
      this.notificationService.notification$.subscribe((message) => {
        this.message = message;
        setTimeout(() => (this.message = null), 3000);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
