import { Injectable } from '@angular/core';
import { TaskModel } from '../models/todo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {}

  public tasks: TaskModel[] = [];

  todoForEdit: TaskModel;

  public findToDoForEdit(todoForEdit) {
    return this.todoForEdit = todoForEdit;
  }

  public addTask(task: TaskModel): void {
    this.tasks.unshift(task);
  }

  public deleteTask(taskId): void {
    const indexForDel = this.tasks.findIndex(todo => todo.id === taskId.id);
    this.tasks.splice(indexForDel, 1);
  }

  public editTask(task: TaskModel): void {
    const indexForDel = this.tasks.findIndex(todo => todo.id === this.todoForEdit.id);
    this.tasks.splice(indexForDel, 1, task);
  }

  public getTasks(): Observable<TaskModel[]> {
    return of(this.tasks);
  }
}
