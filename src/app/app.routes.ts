import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { AuthGuard } from './authGuard';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoggedInWrapperComponent } from './components/logged-in-wrapper/logged-in-wrapper.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: 'login', component: LoginFormComponent },
  {
    path: '',
    component: LoggedInWrapperComponent,
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
      {
        path: 'tasks/:id',
        component: TaskDetailComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    canActivate: [AuthGuard],
    component: NotFoundComponent,
  },
];
