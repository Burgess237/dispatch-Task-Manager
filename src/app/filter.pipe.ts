import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './task';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(tasks: Task[], filterVal: string): any {
    if(!tasks) {return [];}
    if(!filterVal) { return tasks;}
    console.log(tasks, filterVal);

  return tasks = tasks.filter(s => s.accountManager === filterVal);
  }

}
