import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TaskModel } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';
import { LocalstorageService } from '../../services/localstorage.service';

export enum Enum {
  all = 'all',
  active = 'active',
  complete = 'complete'
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  private enumFilter: typeof Enum = Enum;

  isCreate = false;
  filter = '';

  public tasks: TaskModel[] = [];

  taskInput = new FormControl(null, this.emptyValidator);

  constructor(private todoService: TodoService,
              private localstorageService: LocalstorageService) {
  }

  ngOnInit() {
    console.log(this.enumFilter);
    this.getTasks();
    if (localStorage.getItem('tasks') != null && !this.tasks.length) {
      this.localstorageService.createLocalTasks();
    }
  }

  private emptyValidator(control: FormControl) {
    if ((control.value || '').trim().length === 0) {
      return {
        'empty': true
      };
    }
  }

  private findToDo(taskId) {
    return this.tasks.find(todo => todo.id === taskId);
  }

  private findToDoForEdit(taskId) {
    this.localstorageService.findToDoForEdit(this.findToDo(taskId));
    this.todoService.findToDoForEdit(this.findToDo(taskId));
  }

  public toggle(task: TaskModel, taskIndex: number): void {
    task.complete = !task.complete;
    const findIndex = this.tasks.findIndex(todo => todo.id === this.tasks[taskIndex].id);
    this.localstorageService.toggleLocal(task, findIndex);
  }

  public createTask(): void {
    const createId: number = Date.now();
    this.todoService.addTask({
      id: createId,
      title: this.taskInput.value,
      complete: false
    });
    this.localstorageService.addTask();
    this.taskInput.reset();
  }

  private deleteTask(taskId): void {
    this.localstorageService.deleteTask(this.findToDo(taskId));
    this.todoService.deleteTask(this.findToDo(taskId));
  }

  public taskFiltered(): TaskModel[] {
    switch (this.filter) {
      case 'all':
        return this.tasks;
      case 'active':
        return this.tasks.filter(task => !task.complete);
      case 'completed':
        return this.tasks.filter(task => task.complete);
      default:
        return this.tasks;
    }
  }

  getTasks(): void {
    this.todoService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
}
