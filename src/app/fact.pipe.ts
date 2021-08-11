import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fact'
})
export class FactPipe implements PipeTransform {

  transform(fact: string): any {
    return fact.replace('/', '<br>');
  }

}
