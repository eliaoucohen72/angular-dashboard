import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SpinnerComponent} from './components/spinner/spinner.component';
import {NotificationComponent} from './components/notification/notification.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent, NotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'elc-angular-dashboard';
}
