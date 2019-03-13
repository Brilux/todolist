import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { TodoComponent } from './components/todo/todo.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { WeatherComponent } from './components/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { TasksFilterPipe } from './pipes/tasks-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TodoComponent,
    TaskEditComponent,
    WeatherComponent,
    TasksFilterPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
