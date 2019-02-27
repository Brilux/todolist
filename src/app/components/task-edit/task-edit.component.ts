import { Component, OnChanges, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnChanges {

  constructor(private todoService: TodoService, private localstorageService: LocalstorageService) {
  }

  public form: FormGroup = new FormGroup({
    task: new FormControl(null, Validators.required),
    description: new FormControl()
  });

  public editTask(): void {
    const createTime: number = Date.now();
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const editedTask = {
      title: this.form.value.task,
      description: this.form.value.description || tasks[this.todoService.taskIndexForEdit].description || '',
      complete: false,
      date: `${createTime}`
    };
    this.todoService.editTask(editedTask);
    this.localstorageService.editTask(editedTask);
  }

  ngOnInit() {
    this.todoService.getTasks().subscribe(tasks => tasks);
  }

  ngOnChanges() {
    console.log(this.todoService.tasks);
  }
}
