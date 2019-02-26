import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hashKeyvalue'
})
export class HashKeyvaluePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for( let key in value ) {
      keys.push( {key: key, value: value[key] } );
    }
    return keys;
  }

}
