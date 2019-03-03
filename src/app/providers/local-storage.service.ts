import { Inject, Injectable, InjectionToken } from '@angular/core';

// class
import { Wallet, Endpoint, Contact, NtyData } from '../class';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  contacts: Contact[][];
  wallets:Wallet[];
  lang: string;
  selectedMainnetNode: Endpoint;
  selectedTestnetNode: Endpoint;
  selectedMijinNode: Endpoint;
  ntyMainnet:NtyData;
  ntyTestnet:NtyData;
  ntyMijin:NtyData;
  
  constructor(@Inject(BROWSER_STORAGE) public storage: Storage) {}

  getItem(key: string) {
    this.storage.getItem(key);
  }

  setItem(key: string, value: string) {
    this.storage.setItem(key, value);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  //clear() {
  //  this.storage.clear();
  //}
}