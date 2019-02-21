import { Injectable } from '@angular/core';
import { Task } from '../models/todo';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private todoService: TodoService) { }

  private getTasks() {
    return JSON.parse(localStorage.getItem('tasks'));
  }

  private setTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public createLocalTasks(): void {
    const tasks: Task[] = this.getTasks();
    for (const key of tasks) {
      this.todoService.tasks.push(key);
    }
  }

  public toggleLocal(task: Task, taskIndex: number): void {
    const tasks: Task[] = this.getTasks();
    tasks[taskIndex].complete = !tasks[taskIndex].complete;
    this.setTasks(tasks);
  }

  public addTask(): void {
    this.setTasks(this.todoService.tasks);
  }

  public deleteTask(taskIndex: number): void {
    const tasks: Task[] = this.getTasks();
    tasks.splice(taskIndex, 1);
    this.setTasks(tasks);
  }

  public editTask(task: Task): void {
    const tasks: Task[] = this.getTasks();
    tasks.splice(this.todoService.taskIndexForEdit, 1, task);
    this.setTasks(tasks);
  }
}
