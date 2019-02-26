import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import nem from 'nem-sdk';

import { WalletService } from './wallet.service';
import { DataBridgeService } from './data-bridge.service';

// class
import { Wallet, Common } from '../class';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  /**
   * Initialize dependencies and properties
   *
   * @params {services} - Angular services to inject
   */
  constructor(
    private _Wallet: WalletService,
    private _DataBridge: DataBridgeService,
    private _location: Router
    ) { }

  // Service methods region //

  /**
   * Log into the application
   *
   * @param {object} common - A common object
   * @param {object} wallet - A wallet object
   */
  login(common:Common, wallet:Wallet) {
      // Set wallet to use and connect
      if (!this._Wallet.login(common, wallet)) {
          return false;
      }

      // Connect to node
      this._DataBridge.connect();
      // Redirect to dashboard
      //this._location.path('/dashboard');
      this._location.navigate(['dashboard']);

      return true;
  }

    // End methods region //
}
