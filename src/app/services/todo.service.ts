import { Injectable } from '@angular/core';
import { TaskModel } from '../models/todo.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {
  }

  public tasks: TaskModel[] = [];

  todoForEdit: any;

  public findToDoForEdit(todoForEdit) {
    return this.todoForEdit = todoForEdit;
  }

  public addTask(task: TaskModel): void {
    this.tasks.unshift(task);
  }

  public deleteTask(todoForDelete): void {
    const indexForDel = this.tasks.findIndex(todo => todo.id === todoForDelete.id);
    this.tasks.splice(indexForDel, 1);
  }

  public editTask(task: TaskModel): void {
    const indexForDel = this.tasks.findIndex(todo => todo.id === this.todoForEdit.id);
    this.tasks.splice(indexForDel, 1, task);
  }

  getTasks(): Observable<TaskModel[]> {
    return of(this.tasks);
  }
}
