import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'task-edit', component: TaskEditComponent },
  { path: 'todo', component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
