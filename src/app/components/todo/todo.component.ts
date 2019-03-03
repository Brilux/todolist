import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskModel } from '../../models/todo.model';
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

  public tasks: TaskModel[] = [];

  public form: FormGroup = new FormGroup({
    task: new FormControl(null, Validators.required),
    description: new FormControl()
  });

  ngOnInit() {
    this.getTasks();
    if (localStorage.getItem('tasks') != null && !this.tasks.length) {
      this.localstorageService.createLocalTasks();
    }
  }

  private findToDo(taskIndex) {
    return this.tasks.find(todo => todo.id === this.tasks[taskIndex].id);
  }

  private findToDoForEdit(taskIndex) {
    this.localstorageService.findToDoForEdit(this.findToDo(taskIndex));
    this.todoService.findToDoForEdit(this.findToDo(taskIndex));
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
      title: this.form.value.task,
      complete: false
    });
    this.localstorageService.addTask();
    this.form.reset();
  }

  private deleteTask(taskIndex): void {
    this.localstorageService.deleteTask(this.findToDo(taskIndex));
    this.todoService.deleteTask(this.findToDo(taskIndex));
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
