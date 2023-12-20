import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakeToSpace'
})
export class SnakeToSpacePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
  }

}
