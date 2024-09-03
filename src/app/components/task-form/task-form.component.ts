import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Task } from '../../interfaces';

interface TaskFormGroup {
  userId: FormControl<string | null>;
  title: FormControl<string | null>;
  body: FormControl<string | null>;
}

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CommonModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  form: FormGroup;
  @Input() id: number | undefined = undefined;
  @Input() editedTask: Task | null = null;
  @Output() hideDialog = new EventEmitter<boolean>();
  @Output() addTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter<Task>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group<TaskFormGroup>({
      userId: this.formBuilder.control<string | null>('', Validators.required),
      title: this.formBuilder.control<string>('', Validators.required),
      body: this.formBuilder.control<string>('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.editedTask) {
      this.id = this.editedTask.id;
      this.form.patchValue({
        userId: this.editedTask.userId,
        title: this.editedTask.title,
        body: this.editedTask.body,
      });
    }
  }

  _hideDialog() {
    this.hideDialog.emit(false);
  }

  _addTask() {
    if (this.form.valid) {
      const task: Task = { ...(this.form.value as Task), id: this.id };
      this.addTask.emit(task);
      this.hideDialog.emit(false);
    }
  }

  _updateTask() {
    if (this.form.valid) {
      const task: Task = { ...(this.form.value as Task), id: this.id };
      this.updateTask.emit(task);
      this.hideDialog.emit(false);
    }
  }
}
