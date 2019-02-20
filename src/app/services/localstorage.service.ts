import { Injectable } from '@angular/core';
import { Task } from '../models/todo';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private todoService: TodoService) { }

  public createLocalTasks(): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks'));
    for (const key of tasks) {
      this.todoService.tasks.push(key);
    }
  }

  public toggleLocal(task: Task, taskIndex: number): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks'));
    tasks[taskIndex].complete = !tasks[taskIndex].complete;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public addTask(): void {
    localStorage.setItem('tasks', JSON.stringify(this.todoService.tasks));
  }

  public deleteTask(taskIndex: number): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public editTask(task: Task): void {
    const tasks: Task[] = JSON.parse(localStorage.getItem('tasks'));
    tasks.splice(this.todoService.taskIndexForEdit, 1, task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
