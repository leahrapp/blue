import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fillArray'})
export class FillArrayPipe implements PipeTransform {
  transform(value:number) : any {
    let res = [];
    for (let i = 0; i < value; i++) {
        res.push(i);
      }
      return res;
  }
}