import { Component } from '@angular/core';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { SpinnerComponent } from "./components/spinner/spinner.component";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TaskListComponent,
    TaskDetailComponent,
    TaskFormComponent,
    HeaderComponent,
    SidebarComponent,
    NotificationComponent,
    SpinnerComponent,
    MainLayoutComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'elc-angular-dashboard';
}
