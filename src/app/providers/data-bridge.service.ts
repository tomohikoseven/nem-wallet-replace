import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import nem from 'nem-sdk';
import { AlertService } from './alert.service';
import { WalletService } from './wallet.service';
import { DataStoreService } from './data-store.service';
import { FiltersService } from './filters.service';
import { NodesService } from './nodes.service';

@Injectable({
  providedIn: 'root'
})
export class DataBridgeService {

  timeSyncInterval: number;
  connector: any;
  renewalAlertTriggeredFor: any;

  constructor(
    private translate: TranslateService,
    private _Alert: AlertService,
    private _Wallet: WalletService,
    private _DataStore: DataStoreService,
    private filters: FiltersService,
    private _Nodes:NodesService
  ) {

    //// Service properties region ////

    /**
     * The connector
     *
     * @type {object|undefined}
     */
    this.connector = undefined;

    /**
     * Store the time sync interval function
     *
     * @type {setInterval}
     */
    this.timeSyncInterval = undefined;

    /**
     * Prevent renewal alerts to show after every confirmed transactions
     *
     * @type {object}
     */
    this.renewalAlertTriggeredFor = {};

    //// End properties region ////
  }

    //// Service methods region ////
  /**
   * Open websocket connection
   *
   * @param {object} connector - A connector object
   */
  openConnection(connector) {

      // Store the used connector to close it from anywhere easily
      this.connector = connector;

      // Init DataStore
      this._DataStore.init();

      // Connect
      connector.connect().then(() => {

          // Reset at new connection
          this.reset();

          // Start time sync
          this.timeSync();

          /***
           * Few network requests happen on socket connection
           */

          // Gets network time
          nem.com.requests.chain.time(this._Wallet.node).then((res) => {
              setTimeout(() => {
                  this._DataStore.chain.time = res.receiveTimeStamp / 1000;
              });
          },(err) => {
              setTimeout(() => {
                  this._Alert.errorGetTimeSync();
              });
          });

          // Gets current height
          nem.com.requests.chain.height(this._Wallet.node).then((data) => {
              setTimeout(() => {
                  this._DataStore.chain.height = data.height;
              });
          },
          (err) => {
              setTimeout(() => {
                this._Alert.getCurrentHeightError();
              });
          });

          // Gets harvested blocks
          nem.com.requests.account.harvesting.blocks(this._Wallet.node, this._Wallet.currentAccount.address).then((res) => {
              setTimeout(() => {
                  this._DataStore.account.harvesting.blocks = res.data;
              });
          },
          (err) => {
              // Alert error
              setTimeout(() => {
                  this._DataStore.account.harvesting.blocks = [];
              });
          });

          // Gets delegated data
          nem.com.requests.account.data(this._Wallet.node, nem.model.address.toAddress(this._Wallet.currentAccount.child, this._Wallet.network)).then((data) => {
              setTimeout(() => {
                  this._DataStore.account.delegated.metaData = data;
              });
          },
          (err) => {
              setTimeout(() => {
                  this._DataStore.account.delegated.metaData = "";
                  this._Alert.getAccountDataError(err.data.message);
              });
          });

          // Gets market info
          nem.com.requests.market.xem().then((data) => {
              setTimeout(() => {
                  this._DataStore.market.xem = data["BTC_XEM"];
              });
          },
          (err) => {
              setTimeout(() => {
                  this._Alert.errorGetMarketInfo();
                  this._DataStore.market.xem = undefined;
              });
          });

          // Gets btc price
          nem.com.requests.market.btc().then((data) => {
              setTimeout(() => {
                  this._DataStore.market.btc = data;
              });
          },
          (err) => {
              setTimeout(() => {
                  this._Alert.errorGetBtcPrice();
                  this._DataStore.market.btc = undefined;
              });
          });

          // Set connection status
          setTimeout(() => {
              this._DataStore.connection.status = true;
          });

          // On error we show it in an alert
          nem.com.websockets.subscribe.errors(connector, (name, d) => {
              setTimeout(() => {
                  console.log("Error:");
                  console.log(name);
                  if (d) {
                      console.log(d);
                      this._Alert.websocketError(d.error + " " + d.message);
                  }
              });
          });

          // New height
          nem.com.websockets.subscribe.chain.height(connector, (blockHeight) => {
              setTimeout(() => {
                  this._DataStore.chain.height = blockHeight.height;
              }, 0);
          });

          // Account data
          nem.com.websockets.subscribe.account.data(connector, (d) => {
              setTimeout(() => {
                  this._DataStore.account.metaData = d;
                  // Websocket for multisig accounts
                  for (let i = 0; i < this._DataStore.account.metaData.meta.cosignatoryOf.length; i++) {
                      let address = this._DataStore.account.metaData.meta.cosignatoryOf[i].address;
                      nem.com.websockets.subscribe.account.transactions.confirmed(connector, confirmedCallback, address);
                      nem.com.websockets.subscribe.account.transactions.unconfirmed(connector, unconfirmedCallback, address);
                      nem.com.websockets.subscribe.account.mosaics.owned(connector, mosaicCallback, address);
                      nem.com.websockets.subscribe.account.mosaics.definitions(connector, mosaicDefinitionCallback, address);
                      nem.com.websockets.subscribe.account.namespaces.owned(connector, namespaceCallback, address);

                      nem.com.websockets.requests.account.mosaics.owned(connector, address);
                      nem.com.websockets.requests.account.mosaics.definitions(connector, address);
                      nem.com.websockets.requests.account.namespaces.owned(connector, address);
                  }
              }, 0);
          });

          // Recent transactions
          nem.com.websockets.subscribe.account.transactions.recent(connector, (d) => {
              d.data.reverse();
              setTimeout(() => {
                  this._DataStore.account.transactions.confirmed = d.data;
              });
              console.log("recenttransactions data: ", d);
          });

          // On confirmed we push the tx in transactions array and delete the tx in unconfirmed if present
          //*** BUG: it is triggered twice.. NIS websocket issue or SOCKJS 0.3.4 ? ***//
          let confirmedCallback = (d) => {
              setTimeout(() => {
                  if (!nem.utils.helpers.haveTx(d.meta.hash.data, this._DataStore.account.transactions.confirmed)) { // Fix duplicate bug
                      this._DataStore.account.transactions.confirmed.push(d);
                      let audio = new Audio('vendors/ding2.ogg');
                      audio.play();
                      console.log("Confirmed data: ", d);
                      // If tx present in unconfirmed array it is removed
                      if (nem.utils.helpers.haveTx(d.meta.hash.data, this._DataStore.account.transactions.unconfirmed)) {
                          // Get index
                          let txIndex = nem.utils.helpers.getTransactionIndex(d.meta.hash.data, this._DataStore.account.transactions.unconfirmed);
                          // Remove from array
                          this._DataStore.account.transactions.unconfirmed.splice(txIndex, 1);
                      }
                  }
              }, 0);
          };

          // On unconfirmed we push the tx in unconfirmed transactions array
          //*** BUG: same as confirmedCallback ***//
          let unconfirmedCallback = (d) => {
              setTimeout(() => {
                  if (!nem.utils.helpers.haveTx(d.meta.hash.data, this._DataStore.account.transactions.unconfirmed)) { //Fix duplicate bug
                      this._DataStore.account.transactions.unconfirmed.push(d);
                      let audio = new Audio('vendors/ding.ogg');
                      audio.play();
                      // If not sender show notification
                      if (this.filters.fmtPubToAddress(d.transaction.signer, this._Wallet.network) !== this._Wallet.currentAccount.address) {
                          this._Alert.incomingTransaction(d.transaction.signer, this._Wallet.network);
                      }
                      console.log("Unconfirmed data: ", d);
                  }

                  if(undefined !== d.transaction.mosaics && d.transaction.mosaics.length) {
                      for (let i = 0; i < d.transaction.mosaics.length; i++) {
                          let mos = d.transaction.mosaics[i];
                          if(undefined === this._DataStore.mosaic.metaData[nem.utils.format.mosaicIdToName(mos.mosaicId)]){
                              // Fetch definition from network
                              getMosaicDefinitionMetaDataPair(mos);
                          }
                      }
                  }
              }, 0);
          };

          // Mosaic definition meta data pair callback
          let mosaicDefinitionCallback = (d) => {
              setTimeout(() => {
                  this._DataStore.mosaic.metaData[nem.utils.format.mosaicIdToName(d.mosaicDefinition.id)] = d;
              }, 0);
          };

          // Mosaics owned callback
          let mosaicCallback = (d, address) => {
              setTimeout(() => {
                  let mosaicName = nem.utils.format.mosaicIdToName(d.mosaicId);
                  if (!(address in this._DataStore.mosaic.ownedBy)) this._DataStore.mosaic.ownedBy[address] = {};
                  this._DataStore.mosaic.ownedBy[address][mosaicName] = d;
                  //this._DataStore.mosaic.ownedBy[address].size = Object.keys(this._DataStore.mosaic.ownedBy[address]).length;
              }, 0);
          };

          // Namespaces owned callback
          let namespaceCallback = (d, address) => {
              setTimeout(() => {
                  let namespaceName = d.fqn;
                  if (!(address in this._DataStore.namespace.ownedBy)) this._DataStore.namespace.ownedBy[address] = {};
                  this._DataStore.namespace.ownedBy[address][namespaceName] = d;
                  // Check namespace expiration date
                  // Creation height of ns + 1 year in blocks (~60 blocks per hour * 24h * 365d) - current height < 1 month in blocks (60 blocks per hour * 24h * 30d)
                  if(d.height + 525600 - this._DataStore.chain.height <= 43200 && d.fqn.indexOf('.') === -1 && undefined === this.renewalAlertTriggeredFor[d.fqn]) {
                      setTimeout(() => {
                          this.renewalAlertTriggeredFor[d.fqn] = true;
                          this._Alert.namespaceExpiryNotice(d.fqn, d.height + 525600 - this._DataStore.chain.height);
                      });                  
                  }
              }, 0);
          };

          let getMosaicDefinitionMetaDataPair = (mos) => {
              if (undefined !== mos.mosaicId) {
                  // Fetch definition from network
                  return nem.com.requests.namespace.mosaicDefinitions(this._Wallet.node, mos.mosaicId.namespaceId).then((res) => {
                      if(res.data.length) {
                          for(let i = 0; i < res.data.length; i++) {
                              if (res.data[i].mosaic.id.namespaceId == mos.mosaicId.namespaceId && res.data[i].mosaic.id.name == mos.mosaicId.name) {
                                  this._DataStore.mosaic.metaData[nem.utils.format.mosaicIdToName(mos.mosaicId)] = {};
                                  this._DataStore.mosaic.metaData[nem.utils.format.mosaicIdToName(mos.mosaicId)].supply = res.data[i].mosaic.properties[1].value;
                                  this._DataStore.mosaic.metaData[nem.utils.format.mosaicIdToName(mos.mosaicId)].mosaicDefinition = res.data[i].mosaic;

                                  if(undefined !== res.data[i].mosaic.levy) {
                                      if(undefined === this._DataStore.mosaic.metaData[nem.utils.format.mosaicIdToName(res.data[i].mosaic.levy.mosaicId)]) {
                                          // Fetch definition from network
                                          return getMosaicDefinitionMetaDataPair(res.data[i].mosaic.levy);
                                      }
                                  }
                              }
                          }
                      }
                  },
                  (err) => {
                      this._Alert.transactionError('Failed to fetch definition of ' + nem.utils.format.mosaicIdToName(mos.mosaicId));
                  });
              }
          };


          // Set websockets callbacks
          nem.com.websockets.subscribe.account.transactions.confirmed(connector, confirmedCallback);
          nem.com.websockets.subscribe.account.transactions.unconfirmed(connector, unconfirmedCallback);
          nem.com.websockets.subscribe.account.mosaics.owned(connector, mosaicCallback);
          nem.com.websockets.subscribe.account.mosaics.definitions(connector, mosaicDefinitionCallback);
          nem.com.websockets.subscribe.account.namespaces.owned(connector, namespaceCallback);

          // Request data
          nem.com.websockets.requests.account.data(connector);
          nem.com.websockets.requests.account.transactions.recent(connector);
          nem.com.websockets.requests.account.mosaics.definitions(connector);
          nem.com.websockets.requests.account.mosaics.owned(connector);
          nem.com.websockets.requests.account.namespaces.owned(connector);

      }, (err) => {
          console.log(err);
          // Reconnect to another node
          this.reconnect(connector);
      });

  }
  
  /**
   * Reset DataBridge service properties
   */
  reset() {
      this._DataStore.chain.time = undefined;
      clearInterval(this.timeSyncInterval)
  }

  /**
   * Fetch network time every minute
   */
  timeSync() {
      this.timeSyncInterval = window.setInterval(() => { 
          nem.com.requests.chain.time(this._Wallet.node).then((res) => {
              setTimeout(() => {
                  this._DataStore.chain.time = res.receiveTimeStamp / 1000;
              });
          },(err) => {
              setTimeout(() => {
                  this._Alert.errorGetTimeSync();
              });
          });
      }, 60 * 1000);
  }

  /**
   * Reconnect to a new node
   *
   * @param {object} connector - A connector object
   */
  reconnect(connector) {
      // Close connector
      connector.close();
      // Set a random endpoint into the Wallet service
      this._Nodes.update();
      // Set websocket port to endpoint for connector
      let endpoint = nem.model.objects.create("endpoint")(this._Wallet.node.host, nem.model.nodes.websocketPort);
      // Update connector
      connector = nem.com.websockets.connector.create(endpoint, this._Wallet.currentAccount.address);
      // Try to open connection
      this.openConnection(connector);
      return;
  }

  /**
   * Set default nodes and connect
   */
  connect() {
      // Set needed nodes into the Wallet service
      this._Nodes.setDefault();
      this._Nodes.setUtil();
      // Change endpoint port to websocket port
      let endpoint = nem.model.objects.create("endpoint")(this._Wallet.node.host, nem.model.nodes.websocketPort);
      // Create a connector
      let connector = nem.com.websockets.connector.create(endpoint, this._Wallet.currentAccount.address);
      // Try to open the connection 
      this.openConnection(connector);
      return;
  }

  //// End methods region ////
}
