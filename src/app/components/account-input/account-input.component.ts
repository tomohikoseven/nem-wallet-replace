import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-input',
  templateUrl: './account-input.component.html',
  styleUrls: ['./account-input.component.scss']
})
export class AccountInputComponent implements OnInit {
  isCosignatory:boolean;
  showContacts:boolean;
  accountView:string;
  alias: string;
  publickey: string;
  account: string;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Set data received from Recipient service
   *
   * @param {object} - An [AccountInfo]{@link http://bob.nem.ninja/docs/#accountInfo} object
   */
  setData(data) {
      // Arrange for alias
      if (this.isAlias(this.accountView)) {
          this.alias = this.accountView.substring(1);
      }
      this.accountView = data.account.address;
      // Store account public key
      //this.publicKey = data.account.publicKey;
      // Store clean address
      this.account = data.account.address;
      return;
  }

  /**
   * Reset data stored for account
   */
  resetData() {
      this.alias = "";
      //this.publicKey = "";
      this.account = "";
      return;
  }

    //// Component methods region ////

  /**
   * Process input and get account data from network
   *
   * @param {boolean} isAlias - True is is alias, false otherwise
   */
  processInput(isAlias) {
      this.resetData();
      // Get alias data
      /*
      if (isAlias) return this._Recipient.getAlias(this.accountView).then((res) => {
          this._$timeout(() => {
              return this.setData(res);
          });
      }, (err) => {
          this._$timeout(() => { 
              return this.resetData();
          });
      });
      // Get account data if address length is okay
      if (this.accountView.length === 40 || this.accountView.length === 46) return this._Recipient.getAccount(this.accountView).then((res) => {
          this._$timeout(() => {
              return this.setData(res);
          });
      }, (err) => { 
          this._$timeout(() => {
              return this.resetData();
          });
      });
*/
  }

  /**
   * Check if an input is an alias
   *
   * @param {string} input - A text string to check
   *
   * @return {boolean} - True if alias, false otherwise
   */
  isAlias(input) {
      if (!input) return false;
      return input.lastIndexOf("@", 0) === 0;
  }
}
