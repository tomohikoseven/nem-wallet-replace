import { Pipe, PipeTransform } from '@angular/core';
import nem from 'nem-sdk';

@Pipe({
  name: 'fmtAddress'
})
export class FmtAddressPipe implements PipeTransform {

  transform(input: any): any {
    /**
    * Add hyphens to a clean address
    *
    * @param input: A NEM address
    *
    * @return a formatted NEM address
    */
    return nem.utils.format.address(input);
  }

}
