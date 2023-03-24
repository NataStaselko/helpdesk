import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformKB'
})
export class TransformKBPipe implements PipeTransform {

  transform(value: number): string {
    let str = (value / 1024).toString()
    return str.substring(0, str.indexOf('.')) + ' KB';
  }

}
