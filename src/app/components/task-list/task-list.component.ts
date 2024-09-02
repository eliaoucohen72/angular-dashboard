import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';

import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces';
import { RouterModule } from '@angular/router';
import { NotificationService } from '../../services/notification/notification.service';
import { CommonModule } from '@angular/common';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [RouterModule, TableModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  columns: {
    key: string;
    header?: string;
    isLink?: boolean;
    isRemove?: boolean;
  }[] = [
    { key: 'id', header: 'id' },
    { key: 'userId', header: 'User ID' },
    { key: 'title', header: 'Title' },
    { key: 'body' },
    { key: 'remove' },
  ];
  tasks: Task[] = [];

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

  async delete(id: number): Promise<void> {
    try {
      await lastValueFrom(this.taskService.delete(id));
      this.tasks = this.tasks.filter((task) => task.id !== id);
    } catch (err) {
      console.error('Error deleting task:', err);
      this.notificationService.show('Error during task deletion');
    }
  }
}
