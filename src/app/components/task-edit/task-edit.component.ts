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

  public form: FormGroup = new FormGroup({
    task: new FormControl(null, Validators.required),
    description: new FormControl()
  });

  constructor(private todoService: TodoService, private localstorageService: LocalstorageService) {
  }

  ngOnInit() {
    this.todoService.getTasks().subscribe(tasks => tasks);
  }


  public editTask(): void {
    const createId: number = Date.now();
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const indexForEdit = tasks.findIndex(todo => todo.id === this.todoService.todoForEdit.id);
    const editedTask = {
      id: createId,
      title: this.form.value.task,
      description: this.form.value.description || tasks[indexForEdit].description || '',
      complete: false
    };
    this.todoService.editTask(editedTask);
    this.localstorageService.editTask(editedTask);
  }

  ngOnChanges() {
    console.log(this.todoService.tasks);
  }
}
