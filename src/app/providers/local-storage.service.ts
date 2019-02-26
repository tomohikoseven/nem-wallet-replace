import { Injectable } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';

// class
import { Wallet, Endpoint, Contact, NtyData } from '../class';
//import * from '../class';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  contacts: Contact[][];
  wallets:Wallet[];
  lang: string;
  selectedMainnetNode: Endpoint;
  selectedTestnetNode: Endpoint;
  selectedMijinNode: Endpoint;
  ntyMainnet:NtyData;
  ntyTestnet:NtyData;
  ntyMijin:NtyData;

  constructor(
    private _local: LocalStorageService
  ) { }
}
