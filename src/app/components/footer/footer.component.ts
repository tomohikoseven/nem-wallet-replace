import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../config/app.constants';
import { AlertService } from '../../providers/alert.service';
import { LocalStorageService } from '../../providers/local-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  //AppConstants:any;
  appConstants:any;
  constructor(
    private _storage: LocalStorageService,
    private _Alert: AlertService
    ) { 
    this.appConstants = AppConstants;
  }

  ngOnInit() {
  }

  /**
   * Reset data from localstorage
   */
  purge() {
      this._storage.wallets = [];
      this._Alert.successPurge();
  }

}
