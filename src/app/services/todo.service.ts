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

  public createLocalTasks(): void {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    for (const key of tasks) {
      this.tasks.push(key);
    }
  }

  public toggleLocal(task: Task, taskIndex: number): void {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[taskIndex].complete = !tasks[taskIndex].complete;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public addTask(task: Task): void {
    this.tasks.unshift(task);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  public deleteTask(taskIndex: number): void {
    this.tasks.splice(taskIndex, 1);
    const tasks: [] = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public editTask(task: Task): void {
    this.tasks.splice(this.taskIndexForEdit, 1, task);
    const tasks: [] = JSON.parse(localStorage.getItem('tasks'));
    // @ts-ignore
    tasks.splice(this.taskIndexForEdit, 1, task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }
}
