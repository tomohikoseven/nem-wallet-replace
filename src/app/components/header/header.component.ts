import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

// config
import { AppConfig } from '../../../environments/environment';

// service
import { DataStoreService } from '../../providers/data-store.service';
import { WalletService } from '../../providers/wallet.service';
import { AlertService } from '../../providers/alert.service';
import { StorageService } from '../../providers/local-storage.service';
import { DataBridgeService } from '../../providers/data-bridge.service';
import { Languages } from '../../config/languages';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  languages: Array<{name:string, key:string}>;

  constructor( 
    public _storage: StorageService,
    private _Alert: AlertService,
    public _Wallet: WalletService,
    public _DataStore: DataStoreService,
    private _DataBridge: DataBridgeService,
    private translate: TranslateService
  ) {
    this.languages = Languages.data;
    this._storage.lang = AppConfig.defaultLang;

  }

  ngOnInit() {
  }

  /**
   * Delete current wallet stored in Wallet service and redirect to home logged out
   */
  logout() {
      // Redirect to home
      //this._$location.path('/');
      // Close connector
      //this._DataBridge.connector.close();
      // Set connection status to false
      this._DataStore.connection.status = false;
      // Show success alert
      this._Alert.successLogout();
      // Reset data in DataBridge service
      this._DataBridge.reset();
      // Reset data in Wallet service
      this._Wallet.reset();
      return;
  }

  /**
   * Change language
   *
   * @param {string} key - The language key
   */
  changeLanguage(key:string) {
      console.log(key);
      this.translate.use(key);
      this._storage.lang = key;
      return;
  };

}
