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

  taskIndexForEdit: number;

  public indexForEdit(taskIndex) {
    return this.taskIndexForEdit = taskIndex;
  }

  public addTask(task: Task): void {
    this.tasks.unshift(task);
  }

  public deleteTask(taskIndex: number): void {
    this.tasks.splice(taskIndex, 1);
  }

  public editTask(task: Task): void {
    this.tasks.splice(this.taskIndexForEdit, 1, task);
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }
}
