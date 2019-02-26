import { Injectable } from '@angular/core';
import nem from 'nem-sdk';

// service
import { WalletService } from './wallet.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class RecipientService {

  constructor(
    private _Wallet:WalletService,
    private _Alert:AlertService
    ) { }

  // Service methods region //

  /**
   * Get an account info object from network using an @alias
   *
   * @param {string} input - An @alias
   *
   * @return {Promise} - A resolved promise with an [AccountInfo]{@link http://bob.nem.ninja/docs/#accountInfo} object, or a rejected promise
   */
  getAlias(input:string) {
      // Check if input is an alias
      let isAlias = (input.lastIndexOf("@", 0) === 0);
      if (!isAlias) {
          console.log("Alias must start with @!");
          return Promise.reject(true);
      }
      // Check if correct input
      if (input.length > 1) {
          // Clean namespace name of the @
          let nsForLookup = input.substring(1);
          return nem.com.requests.namespace.info(this._Wallet.node, nsForLookup).then((data) => {
              // Check if address is from network
              if (nem.model.address.isFromNetwork(data.owner, this._Wallet.network)) {
                  return this.getAccount(data.owner);
              } else {
                  setTimeout(() => {
                      this._Alert.invalidAddressForNetwork(data.owner, this._Wallet.network);
                  });
                  return Promise.reject(true);
              }
          },
          (err) => {
              setTimeout(() => {
                  if(err.code < 0) {
                      this._Alert.connectionError();
                  }  else {
                      this._Alert.getNamespacesByIdError(err.data.message);
                  }
              });
              return Promise.reject(true);
          });
      } else {
          console.log("Alias must have at least one character!")
          return Promise.reject(true);
      }
  }

  /**
   * Get an account info object from network using an address
   *
   * @param {string} input - A NEM address
   *
   * @return {Promise} - A resolved promise with an [AccountInfo]{@link http://bob.nem.ninja/docs/#accountInfo} object, or a rejected promise
   */
  getAccount(input:string) {
      // Check if input is an alias
      let isAlias = (input.lastIndexOf("@", 0) === 0);
      // Return if input incorrect
      if (isAlias) return Promise.reject(true);
      if (!nem.model.address.isValid(input)) {
          console.log("Provided address is not valid!");
          return Promise.reject(true);
      }
      if (!nem.model.address.isFromNetwork(input, this._Wallet.network)) {
          console.log("Provided address does not correspond to the current network!");
          return Promise.reject(true);
      }
      // Get account data
      return nem.com.requests.account.data(this._Wallet.node, input.toUpperCase().replace(/-/g, '')).then((data) => {
          return data;
      },
      (err) => {
          setTimeout(() => {
              if(err.code < 0) {
                  this._Alert.connectionError();
              }  else {
                  this._Alert.getAccountDataError(err.data.message);
              }
          });
          return Promise.reject(true);
      });
  }

  // End methods region //

}
