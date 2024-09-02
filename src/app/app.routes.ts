import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'tasks', pathMatch: 'full' },
      { path: 'tasks', component: TaskListComponent },
      { path: 'tasks/:id', component: TaskDetailComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
