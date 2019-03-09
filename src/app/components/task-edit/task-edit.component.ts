import { Component, OnChanges, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit, OnChanges {

  title: string;
  description: string;

  public form: FormGroup = new FormGroup({
    task: new FormControl('', this.emptyValidator),
    description: new FormControl()
  });

  constructor(private todoService: TodoService,
              private localstorageService: LocalstorageService) {
  }

  ngOnInit() {
    this.currentTask();
    this.todoService.getTasks().subscribe(tasks => tasks);
  }

  private currentTask() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const indexForEdit = tasks.findIndex(todo => todo.id === this.todoService.todoForEdit.id);
    this.title = tasks[indexForEdit].title;
    this.description = tasks[indexForEdit].description || '';
  }

  private emptyValidator(control: FormControl) {
    if ((control.value || '').trim().length === 0) {
      return {
        'empty': true
      };
    }
  }

  public editTask(): void {
    const createId: number = Date.now();
    const editedTask = {
      id: createId,
      title: this.form.value.task,
      description: this.form.value.description,
      complete: false
    };
    this.todoService.editTask(editedTask);
    this.localstorageService.editTask(editedTask);
  }

  ngOnChanges() {
    console.log(this.todoService.tasks);
  }
}
