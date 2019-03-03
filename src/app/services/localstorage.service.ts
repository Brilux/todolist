import { Injectable } from '@angular/core';
import { TaskModel } from '../models/todo.model';
import { TodoService } from './todo.service';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor(private todoService: TodoService) { }

  todoForEdit: any;

  public findToDoForEdit(todoForEdit) {
    return this.todoForEdit = todoForEdit;
  }

  private getTasks() {
    return JSON.parse(localStorage.getItem('tasks'));
  }

  private setTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  public createLocalTasks(): void {
    const tasks: TaskModel[] = this.getTasks();
    for (const key of tasks) {
      this.todoService.tasks.push(key);
    }
  }

  public toggleLocal(task: TaskModel, taskIndex: number): void {
    const tasks: TaskModel[] = this.getTasks();
    tasks[taskIndex].complete = !tasks[taskIndex].complete;
    this.setTasks(tasks);
  }

  public addTask(): void {
    this.setTasks(this.todoService.tasks);
  }

  public deleteTask(todoForDelete): void {
    const tasks: TaskModel[] = this.getTasks();
    const indexForDel = tasks.findIndex(todo => todo.id === todoForDelete.id);
    tasks.splice(indexForDel, 1);
    this.setTasks(tasks);
  }

  public editTask(task: TaskModel): void {
    const tasks: TaskModel[] = this.getTasks();
    const indexForDel = tasks.findIndex(todo => todo.id === this.todoForEdit.id);
    tasks.splice(indexForDel, 1, task);
    this.setTasks(tasks);
  }
}
