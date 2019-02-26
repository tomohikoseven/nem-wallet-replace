import { Pipe, PipeTransform } from '@angular/core';
import nem from 'nem-sdk';

@Pipe({
  name: 'toNetworkName'
})
export class ToNetworkNamePipe implements PipeTransform {

  /**
  * Get network name from id
  *
  * @param id: The network id
  *
  * @return the network name
  */
  transform(id: number, args?: any): string {
    if (id === nem.model.network.data.testnet.id) {
        return 'Testnet';
    } else if (id === nem.model.network.data.mainnet.id) {
        return 'Mainnet';
    } else {
        return 'Mijin';
    }
  }

}
