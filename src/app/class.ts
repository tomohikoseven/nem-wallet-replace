export class Account {
  brain:     boolean;
  algo:      string;
  encrypted: string;
  iv:        string;
  address:   string;
  label:     string = "Primary";
  network:   number;
  child:     string
}

export class Wallet {
  name: string;
  accounts: { [key: string]: Account };
}

export class Contact {
  label: string;
  address: string;
}

export class Endpoint {
  host: string;
  port: string;
}

export class Current {
  name: string = undefined;
  accounts: { [key: string]: Account };
  //accounts: Account[];
}

export class CurrentAccount {
  label: string;
  address: string;
  child:string;  // publicKey
}

export class BIP32Data {
    address: string;
    privateKey: string;
    publicKey: string;
}

export class Common {
  password:string;
  privateKey: string;
  isHW: boolean;
};

export class NtyData {
  [key: string]: Array<NtyData>;
}

export class TransferData {
  recipient: string;
  message: string;
  amount:number;
  encryptMessage:boolean;
  isMultisig:boolean;
  isMosaicTransfer:boolean;
  recipientPubKey:string;
}

export class MainAccount {
  address:string;
  password:string;
  privateKey:string;
  publicKey:string;
}