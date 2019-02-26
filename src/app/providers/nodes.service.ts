import { Injectable } from '@angular/core';
import nem from 'nem-sdk';
import UrlParser from 'url-parse';

import { WalletService } from './wallet.service';
import { StorageService } from './local-storage.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class NodesService {

  constructor(
    private _storage : StorageService,
    private _Wallet: WalletService,
    private _Alert: AlertService
    ) { }

  //// Service methods region ////

  /**
   * Set util nodes according to network
   */
  setUtil() {
      if (this._Wallet.network === nem.model.network.data.testnet.id) {
          this._Wallet.searchNode = nem.model.objects.create("endpoint")(nem.model.nodes.searchOnTestnet[0].uri, nem.model.nodes.defaultPort);
          this._Wallet.chainLink = nem.model.nodes.testnetExplorer;
      } else if (this._Wallet.network === nem.model.network.data.mainnet.id) {
          this._Wallet.searchNode = nem.model.objects.create("endpoint")(nem.model.nodes.searchOnMainnet[0].uri, nem.model.nodes.defaultPort);
          this._Wallet.chainLink = nem.model.nodes.mainnetExplorer;
      } else {
          this._Wallet.searchNode = nem.model.objects.create("endpoint")(nem.model.nodes.searchOnMijin[0].uri, nem.model.nodes.mijinPort);
          this._Wallet.chainLink = nem.model.nodes.mijinExplorer;
      }
      return;
  }

  /**
   * Check if nodes present in local storage or set default according to network
   */
  setDefault() {
      if (this._Wallet.network == nem.model.network.data.mainnet.id) {
          if (this._storage.selectedMainnetNode) {
              this._Wallet.node = this._storage.selectedMainnetNode;
          } else {
              let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.mainnet[0].uri, nem.model.nodes.defaultPort);
              this._Wallet.node = endpoint;
          }
          this._Wallet.nodes = nem.model.nodes.mainnet;
      } else if (this._Wallet.network == nem.model.network.data.testnet.id) {
          if (this._storage.selectedTestnetNode) {
              this._Wallet.node = this._storage.selectedTestnetNode;
          } else {
              let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.testnet[0].uri, nem.model.nodes.defaultPort);
              this._Wallet.node = endpoint;
          }
          this._Wallet.nodes = nem.model.nodes.testnet;
      } else {
          if (this._storage.selectedMijinNode) {
              this._Wallet.node = this._storage.selectedMijinNode;
          } else {
              let endpoint = nem.model.objects.create("endpoint")(nem.model.nodes.mijin[0].uri, nem.model.nodes.mijinPort);
              this._Wallet.node = endpoint;
          }
          this._Wallet.nodes = nem.model.nodes.mijin;
      }
      return;
  }

  /**
   * Update the node in Wallet service and update local storage
   * If no endpoint provided a random node will be used
   *
   * @param {object} endpoint - An endpoint object (optional)
   */
  update(endpoint?) {
      let _endpoint;
      // Set node in local storage according to network
      if (this._Wallet.network == nem.model.network.data.mainnet.id) {
          _endpoint = endpoint || nem.model.objects.create("endpoint")(nem.model.nodes.mainnet[Math.floor(Math.random()*nem.model.nodes.mainnet.length)].uri, nem.model.nodes.defaultPort);
          this._storage.selectedMainnetNode = _endpoint;
      } else if (this._Wallet.network == nem.model.network.data.testnet.id) {
          _endpoint = endpoint || nem.model.objects.create("endpoint")(nem.model.nodes.testnet[Math.floor(Math.random()*nem.model.nodes.testnet.length)].uri, nem.model.nodes.defaultPort);
          this._storage.selectedTestnetNode = _endpoint;
      } else {
          _endpoint = endpoint || nem.model.objects.create("endpoint")(nem.model.nodes.mijin[Math.floor(Math.random()*nem.model.nodes.mijin.length)].uri, nem.model.nodes.mijinPort);
          this._storage.selectedMijinNode = _endpoint;
      }
      // Set endpoint in Wallet service
      this._Wallet.node = _endpoint;
      return;
  }

}
