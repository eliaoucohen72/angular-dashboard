import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces';
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
  columns: Column[] = [
    { key: 'id', header: 'id' },
    { key: 'userId', header: 'User ID' },
    { key: 'title', header: 'Title' },
    { key: 'body' },
    { key: 'remove' },
  ];
  tasks: Task[] = [];
  visible = false;
  editedTask: Task | null = null;

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    try {
      this.tasks = await lastValueFrom(this.taskService.getAll());
    } catch (err) {
      console.error('Error fetching tasks:', err);
      this.notificationService.show('Error during task retrieval');
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await lastValueFrom(this.taskService.delete(id));
      this.tasks = this.tasks.filter((task) => task.id !== id);
    } catch (err) {
      console.error('Error deleting task:', err);
      this.notificationService.show('Error during task deletion');
    }
  }

  async addTask(task: Task): Promise<void> {
    try {
      await lastValueFrom(this.taskService.create(task));
      this.tasks = [task, ...this.tasks];
    } catch (err) {
      console.error('Error creating task:', err);
      this.notificationService.show('Error during task creation');
    }
  }

  async editTask(task: Task): Promise<void> {
    try {
      await lastValueFrom(this.taskService.edit(task));
      this.tasks = [task, ...this.tasks];
    } catch (err) {
      console.error('Error editing task:', err);
      this.notificationService.show('Error during task edition');
    }
    this.editedTask = null;
  }

  openEditTaskForm(task: Task) {
    this.editedTask = task;
    this.visible = true;
  }
}
