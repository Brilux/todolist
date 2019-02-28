import { Injectable } from '@angular/core';
import { Task } from '../models/todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor() {
  }

  public tasks: Task[] = [];

  todoForEdit: any;

  public findToDoForEdit(todoForEdit) {
    return this.todoForEdit = todoForEdit;
  }

  public addTask(task: Task): void {
    this.tasks.unshift(task);
  }

  public deleteTask(todoForDelete): void {
    const indexForDel = this.tasks.findIndex(todo => todo.id === todoForDelete.id);
    this.tasks.splice(indexForDel, 1);
  }

  public editTask(task: Task): void {
    const indexForDel = this.tasks.findIndex(todo => todo.id === this.todoForEdit.id);
    this.tasks.splice(indexForDel, 1, task);
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }
}
