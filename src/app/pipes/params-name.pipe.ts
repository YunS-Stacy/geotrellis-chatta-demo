import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paramsName'
})
export class ParamsNamePipe implements PipeTransform {

  transform(value: string, saparator: string): string {
    const arr = value.split(saparator);
    const res = arr.map(el => {
      return el.charAt(0).toUpperCase() + el.slice(1);
    });
    return res.join(' ');
  }

}
