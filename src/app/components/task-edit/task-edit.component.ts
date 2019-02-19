import { Component, OnChanges, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnChanges {

  constructor(private todoService: TodoService) {
  }

  public form: FormGroup = new FormGroup({
    task: new FormControl(null, Validators.required),
    description: new FormControl()
  });

  public editTask(): void {
    const time = new Date();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    this.todoService.editTask({
      title: this.form.value.task,
      description: this.form.value.description || tasks[this.todoService.taskIndexForEdit].description || '',
      complete: false,
      date: `${day} / ${month} / ${hour}:${minutes}`
    });
  }

  ngOnInit() {
    this.todoService.getTasks().subscribe(tasks => tasks);
  }

  ngOnChanges() {
    console.log(this.todoService.tasks);
  }
}
