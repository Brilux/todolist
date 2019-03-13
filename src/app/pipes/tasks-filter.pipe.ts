import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../models/todo.model';

@Pipe({
  name: 'tasksFilter'
})
export class TasksFilterPipe implements PipeTransform {

  transform(tasks: TaskModel[], arg?: string): any {
    switch (arg) {
      case 'all':
        return tasks;
      case 'active':
        return tasks.filter(task => !task.complete);
      case 'completed':
        return tasks.filter(task => task.complete);
      default:
        return tasks;
    }
  }
}
