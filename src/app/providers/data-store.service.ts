import { Injectable } from '@angular/core';

class Chain {
  height: number;
  time: number;
}

class Connection {
  connector: undefined;
  status: boolean;
}

class MetaData {
  account: string = undefined;
  meta:any;
}

class Account {
  metaData: MetaData;
  metaDataOf: {};
  transactions: { 
    confirmed: Array<any>,
    unconfirmed: Array<any>
  };
  harvesting: { 
    blocks:Array<any>
  };
  delegated: {
    metaData: string
  }
}

class Mosaic {
  metaData: {};
  ownedBy: {}
}

class Namespace {
  ownedBy: {}
}

class Market {
  xem: undefined;
  btc: undefined;
  selected: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {
  public chain: Chain;
  public connection: Connection;
  public account: Account;
  public mosaic: Mosaic;
  public namespace: Namespace;
  public market: Market;

  constructor() { 

    // Initialize with default values
    this.init();
  }

  //// Service methods region ////

  init() {
      //// Chain related data ////

      this.chain = {
          height: 0,
          time: 0
      }

      //// Connectivity related data ////

      this.connection = {
          connector: undefined,
          status: false
      }

      //// Current account related data ////

      this.account = {
          metaData: new MetaData(),
          metaDataOf: {},
          transactions: {
              confirmed: [],
              unconfirmed: []
          },
          harvesting: {
              blocks: []
          },
          delegated: {
              metaData: undefined
          }
      }

      //// Mosaic related data ////

      this.mosaic = {
          metaData: {},
          ownedBy: {}
      }

      //// Namespace related data ////

      this.namespace = {
          ownedBy: {}
      }

      //// Market related data ////

      this.market = {
          xem: undefined,
          btc: undefined,
          selected: 'XEM'
      }
  }

  //// End methods region ////
}
