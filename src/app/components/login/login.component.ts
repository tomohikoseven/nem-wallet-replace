import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import nem from 'nem-sdk';

// service
import { WalletService } from '../../providers/wallet.service';
import { AlertService } from '../../providers/alert.service';
import { LocalStorageService } from '../../providers/local-storage.service';
import { LoginService } from '../../providers/login.service';

// class 
//import { Wallet } from '../../providers/address-book.service';
import { Wallet, Common } from '../../class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  needsUpgrade: boolean;
  showSafetyMeasure: boolean;
  selectedWallet: any;
  wallets = [
    { name: 'aaa'}
    ,{name: 'bbb'}
  ];
  common: Common;
  hideTrezor: boolean;
  okPressed:boolean;
  rawWallet: string;

  constructor(
    private _storage: LocalStorageService,
    private _alert: AlertService,
    private _Wallet: WalletService,
    private _Login: LoginService
    ) { 
      //// Module properties region ////

      // Selected wallet
      this.selectedWallet = undefined;

      // Get wallets from local storage or set an empty array
      this._storage.wallets = this._storage.wallets || [new Wallet()];

      // Common object to contain our password & private key data.
      this.common = nem.model.objects.get("common");

      //// End properties region ////

      // Hide trezor button if using chrome builds
      //if (typeof nw !== 'undefined') this.hideTrezor = true;
      this.hideTrezor = true; // TODO:今はtrezor使えないようにする
  }

  ngOnInit() {
  }

  //// Module methods region ////

  /**
   * Load a wallet in browser local storage
   *
   * @param {string} data - Base 64 string from .wlt file
   * @param {boolean} isNCC - True if NCC wallet, false otherwise
   */
  loadWallet(data:string, isNCC:boolean) {
      this._Wallet.load(data, isNCC);
      return;
  }

  /**
   * Log into the application if no need to upgrade
   *
   * @param {object} wallet - A wallet object
   */
  login(wallet:Wallet) {
      // Check if wallet needs upgrade
      if (this._Wallet.needsUpgrade(wallet)) {
          this.needsUpgrade = true;
          return;
      }

      if (this._Login.login(this.common, wallet)) {
          // Clean common object
          this.common = nem.model.objects.get("common");
      }
  }

  /**
   * Derive a child account using bip32 for each accounts of the selected wallet
   */
  upgradeWallet() {
      // Lock button
      this.okPressed = true;
      // Upgrade
      return this._Wallet.upgrade(this.common, this.selectedWallet).then(()=> {
          setTimeout(() => {
              // Unlock button
              this.okPressed = false;
              // Clean common object
              this.common = nem.model.objects.get("common");
              // Prepare wallet download link
              this._Wallet.prepareDownload(this.selectedWallet);
              // Store base64 format for safety protocol
              this.rawWallet = this._Wallet.base64Encode(this.selectedWallet);
              //
              this.needsUpgrade = false;
              this.showSafetyMeasure = true;
          });
      }, 
      (err) => {
          setTimeout(() => {
              // Unlock button
              this.okPressed = false;
              // Clean common object
              this.common = nem.model.objects.get("common");
          });
      })
  }

    //// End methods region ////

}
