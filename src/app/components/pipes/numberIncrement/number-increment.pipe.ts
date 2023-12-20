import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberIncrement'
})
export class NumberIncrementPipe implements PipeTransform {

  transform(value: number): number {
    return ++value;
  }

}
