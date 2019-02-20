import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService, private localstorageService: LocalstorageService) {
  }

  isCreate = false;
  filter = '';

  public tasks: Task[] = [];

  public form: FormGroup = new FormGroup({
    task: new FormControl(null, Validators.required),
    description: new FormControl()
  });

  public indexForEdit(taskIndex) {
    this.todoService.indexForEdit(taskIndex);
  }

  public toggle(task: Task, taskIndex: number): void {
    task.complete = !task.complete;
    this.localstorageService.toggleLocal(task, taskIndex);
  }

  public createTask(): void {
    const time = new Date();
    const day = time.getDate();
    const month = time.getMonth() + 1;
    const hour = time.getHours();
    const minutes = time.getMinutes();
    this.todoService.addTask({
      title: this.form.value.task,
      description: this.form.value.description || '',
      complete: false,
      date: `${day} / ${month} / ${hour}:${minutes}`
    });
    this.localstorageService.addTask();
    this.form.reset();
  }

  public getLocalTasks(): void {
    this.localstorageService.createLocalTasks();
  }

  public deleteTask(index: number): void {
    this.todoService.deleteTask(index);
    this.localstorageService.deleteTask(index);
  }

  public taskFiltered(): Task[] {
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

  ngOnInit() {
    this.getTasks();
    if (localStorage.getItem('tasks') != null && !this.tasks.length) {
      this.getLocalTasks();
    }
  }

  getTasks(): void {
    this.todoService.getTasks().subscribe(tasks => this.tasks = tasks);
  }
}
