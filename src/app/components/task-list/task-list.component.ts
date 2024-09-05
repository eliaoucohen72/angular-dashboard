import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { TaskService } from '../../services/task/task.service';
import { Task, User } from '../../interfaces';
import { NotificationService } from '../../services/notification/notification.service';
import { TaskFormComponent } from '../task-form/task-form.component';
import { DialogModule } from 'primeng/dialog';

interface Column {
  key: string;
  header?: string;
  isLink?: boolean;
  isRemove?: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    RouterModule,
    TableModule,
    CommonModule,
    ButtonModule,
    TaskFormComponent,
    DialogModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  user: User | null = null;
  columns: Column[] = [
    { key: 'id', header: 'id' },
    { key: 'userId', header: 'User ID' },
    { key: 'title', header: 'Title' },
    { key: 'body' },
    { key: 'remove' },
  ];
  tasks: Task[] = [];
  dialogVisible = false;
  selectedTask: Task | null = null;
  editMode = false;

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  openDialog(task: Task, editMode = false) {
    this.selectedTask = task;
    this.dialogVisible = true;
    this.editMode = editMode;
  }

  hideDialog() {
    this.selectedTask = null;
    this.dialogVisible = false;
  }

  // REQUESTS
  async loadTasks(): Promise<void> {
    try {
      this.tasks = await lastValueFrom(this.taskService.getAll());
    } catch (err: unknown) {
      console.error('Error fetching task:', err);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await lastValueFrom(this.taskService.delete(id));
      this.notificationService.show('success', 'Task successfully deleted');
      await this.loadTasks();
    } catch (err: unknown) {
      console.error('Error deleting task:', err);
    }
  }

  async addTask(task: Task): Promise<void> {
    try {
      await lastValueFrom(this.taskService.create(task));
      this.notificationService.show('success', 'Task successfully added');
      await this.loadTasks();
    } catch (err: unknown) {
      console.error('Error creating task:', err);
    }
  }

  async updateTask(task: Task): Promise<void> {
    try {
      await lastValueFrom(this.taskService.edit(task));
      this.notificationService.show('success', 'Task successfully updated');
      await this.loadTasks();
    } catch (err: unknown) {
      console.error('Error updating task:', err);
    }
  }
}
