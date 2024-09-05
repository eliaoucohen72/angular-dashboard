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
import { InputTextareaModule } from 'primeng/inputtextarea';
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
    InputTextareaModule,
  ],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss',
})
export class TaskFormComponent implements OnInit {
  form: FormGroup;
  @Input() id: number | undefined = undefined;
  @Input() selectedTask: Task | null = null;
  @Input() editMode = false;
  @Output() hideDialog = new EventEmitter<boolean>();
  @Output() addTask = new EventEmitter<Task>();
  @Output() updateTask = new EventEmitter<Task>();

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group<TaskFormGroup>({
      userId: this.formBuilder.control<string | null>(
        { value: '', disabled: !this.editMode },
        Validators.required
      ),
      title: this.formBuilder.control<string>(
        { value: '', disabled: !this.editMode },
        Validators.required
      ),
      body: this.formBuilder.control<string>(
        { value: '', disabled: !this.editMode },
        Validators.required
      ),
    });
  }

  ngOnInit(): void {
    if (this.selectedTask) {
      this.id = this.selectedTask.id;
      this.form.patchValue({
        userId: this.selectedTask.userId,
        title: this.selectedTask.title,
        body: this.selectedTask.body,
      });

      this.toggleFormFields()
    }
  }

  toggleFormFields(): void {
    if (this.editMode) {
      this.form.get('userId')?.enable();
      this.form.get('title')?.enable();
      this.form.get('body')?.enable();
    } else {
      this.form.get('userId')?.disable();
      this.form.get('title')?.disable();
      this.form.get('body')?.disable();
    }
  }

  cancel() {
    this.hideDialog.emit(false);
  }

  save() {
    const task: Task = { ...(this.form.value as Task), id: this.id };
    if (this.selectedTask) {
      this.updateTask.emit(task);
    } else {
      this.addTask.emit(task);
    }
    this.hideDialog.emit(false);
  }
}
