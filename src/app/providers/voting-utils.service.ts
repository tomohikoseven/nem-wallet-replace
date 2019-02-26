import { Injectable } from '@angular/core';
import nem from 'nem-sdk';

// service
import { WalletService } from './wallet.service';
import { WalletBuilderService } from './wallet-builder.service';
import { AlertService } from './alert.service';
import { FiltersService } from './filters.service';

//class 
import { TransferData, MainAccount, Wallet } from '../class';

@Injectable({
  providedIn: 'root'
})
export class VotingUtilsService {
  disableSuccessAlert:boolean;

  constructor(
    private _Wallet:WalletService,
    private _Alert:AlertService,
    private _WalletBuilder: WalletBuilderService,
    private _filter: FiltersService
  ) { 
    this.disableSuccessAlert = false;
  }

  disableSuccessAlerts() {
      this.disableSuccessAlert = true;
  }

  enableSuccessAlerts() {
      this.disableSuccessAlert = false;
  }

  /**
   * getFirstMessagesWithString(address,str,start) Obtains the last Message that contains string after position start
   *
   * @param {string} address - NEM Address to explore
   * @param {string} str - String to find on addresses txs
   * @param {object} options - Dictionary that can contain:
   *                 options.fromAddress (only return transactions)
   *                 options.start (starting character of the string to look into)
   *
   * @return {promise} - A promise of the NetworkRequests service that returns a string with the filtered message
   */
  getFirstMessageWithString(address:string, str:string, options) {

      // Get ALL Transactions since the API only allows us to iterate on a descending order
      return this.getTransactionsWithString(address, str, options).then((result) => {
          let message;
          if (result && result.length > 0) {

              // Get the first message ever
              message = result[result.length - 1].transaction.message;
          }
          return message;
      });
  }

  /**
   * getTransactionsWithString(address, str, start) Obtains every transaction message that contains a certain string (starting from position start)
   *
   * @param {string} address - NEM Address to explore
   * @param {string} str - String to find on addresses txs
   * @param {object} options - Dictionary that can contain:
   *                 options.fromAddress (only return transactions)
   *                 options.start (starting character of the string to look into)
   *                 options.limit - Limit amount of results to return
   *                 options.block - Return only transactions made until this block
   *
   * @return {promise} - A promise of the NetworkRequests service that returns an Array with the filtered messages
   */
  getTransactionsWithString(address:string, str:string, options) {

      var trans = [];

      // Options is optional
      if (!options || options.constructor != Object)
          options = {};
      if (!options.start)
          options.start = 0;

      // Recursive promise that will obtain every transaction from/to <address>, order it chronologically and return the ones
      // whose message contains <str>.
      var getTx = (function(txID) {

          // Obtain all transactions to/from the address
          return nem.com.requests.account.transactions.all(this._Wallet.node, address, "", txID).then((result) => {
              var transactions = result.data;
              // If there transactions were returned and the limit was not reached
              if (transactions.length > 0 && (!options.limit || trans.length < options.limit)) {

                  // IDs are ordered, we grab the latest
                  var last_id = transactions[transactions.length - 1].meta.id;

                  // Order transactions chronologically
                  transactions.sort(function(a, b) {
                      return b.meta.height - a.meta.height;
                  });

                  // Iterate every transaction and add the valid ones to the array
                  for (var i = 0; transactions.length > i && (!options.limit || trans.length < options.limit); i++) {

                      let transaction = transactions[i].transaction;
                      let meta = transactions[i].meta;

                      // Multisig transactions
                      if (transaction.type == 4100) {
                          transaction = transaction.otherTrans;
                      }
                      // Regular transactions (multisig otherTrans is of type 257)
                      if (transaction.type == 257) {
                          // On this version we are only using decoded messages!
                          let msg = this._filter.fmtHexMessage(transaction.message);

                          // Check if transaction should be added depending on the message and its signer
                          if (msg.includes(str, options.start) && (!options.fromAddress || nem.model.address.toAddress(transaction.signer, this._Wallet.network) == options.fromAddress)) {
                              // We decode the message and store it
                              transaction.message = msg;
                              transactions[i].transaction = transaction;
                              trans[trans.length] = transactions[i];
                          }
                      }
                  }
                  // Keep searching for more transactions after last_id
                  return getTx(last_id);
              } else {
                  return trans;
              }
          });
      }).bind(this);

      return getTx();
  }

  /**
   * processTxData(transferData) Processes transferData
   *
   * @param {object} tx - The transaction data
   *
   * @return {promise} - An announce transaction promise of the NetworkRequests service
   */
  processTxData(transferData:TransferData) {
      // return if no value or address length < to min address length
      if (!transferData || !transferData.recipient || transferData.recipient.length < 40) {
          return;
      }

      // Clean address
      let recipientAddress = transferData.recipient.toUpperCase().replace(/-/g, '');
      // Check if address is from the same network
      if (nem.model.address.isFromNetwork(recipientAddress, this._Wallet.network)) {
          // Get recipient account data from network
          return nem.com.requests.account.data(this._Wallet.node, recipientAddress).then((data) => {
              // Store recipient public key (needed to encrypt messages)
              transferData.recipientPubKey = data.account.publicKey;
              // Set the address to send to
              transferData.recipient = recipientAddress;
          }, (err) => {
              this._Alert.getAccountDataError(err.data.message);
              return;
          });
      } else {
          // Error
          this._Alert.invalidAddressForNetwork(recipientAddress, this._Wallet.network);
          // Reset recipient data
          throw "invalidAddressForNetwork";
      }
  }

  /**
   * send(entity) Sends a transaction to the network based on an entity
   *
   * @param {object} entity - The prepared transaction object
   * @param {object} common - A password/privateKey object
   *
   * @return {promise} - An announce transaction promise of the NetworkRequests service
   */
  send(entity, common) {
      if (!common.privateKey) {
          this._Alert.invalidPassword();
          throw "privateKey is empty";
      }
      // Construct transaction byte array, sign and broadcast it to the network
      return nem.model.transactions.send(common, entity, this._Wallet.node).then((result) => {
          // Check status
          if (result.status === 200) {
              // If code >= 2, it's an error
              if (result.data.code >= 2) {
                  this._Alert.transactionError(result.data.message);
                  throw(result.data.message);
              } else {
                  if (this.disableSuccessAlert == false) {
                      this._Alert.transactionSuccess();
                  }
              }
          }
      }, (err) => {
          this._Alert.transactionError('Failed ' + err.data.error + " " + err.data.message);
          throw(err);
      });
  }

  /**
   * sendMessage(recipientAccount, message, common) Sends a minimal transaction containing a message to poin
   *
   * @param {object} receiver - Transaction receiver's account
   * @param {string} message - Message to be sent
   * @param {object} common -  password/privateKey object
   *
   * @return {promise} - An announce transaction promise of the NetworkRequests service
   */
  sendMessage(receiver, message:string, common, amount) {

      if (!amount)
          amount = 0;

      var transferData = new TransferData();
      // Check that the receiver is a valid account and process it's public key
      transferData.recipient = receiver;
      this.processTxData(transferData);
      // transferData.receiverPubKey is set now

      transferData.amount = amount;
      transferData.message = message;
      transferData.encryptMessage = false; // Maybe better to encrypt?
      transferData.isMultisig = false;
      transferData.isMosaicTransfer = false;

      // Build the entity to be sent
      let entity = nem.model.transactions.prepare("transferTransaction")(common, transferData, this._Wallet.network);
      return this.send(entity, common);
  }

  /**
   * createNewAccount() creates a new account using a random seed
   */
  createNewAccount() {
    return new Promise( (resolve, reject) => { 
      var rk = nem.crypto.helpers.randomKey();
      var seed = this._Wallet.currentAccount.address + " is creating an account from " + rk;
      // console.log("creating a HDW from "+seed);

      // Create the brain wallet from the seed
      this._WalletBuilder.createBrainWallet(seed, seed, this._Wallet.network).then((wallet:Wallet) => {
          setTimeout(() => {
              if (wallet) {
                  var mainAccount = new MainAccount();
                  mainAccount.address = wallet.accounts[0].address;
                  mainAccount.password = seed;
                  mainAccount.privateKey = "";

                  // Get account private key for preparation or return
                  if (!this._Wallet.decrypt(mainAccount, wallet.accounts[0], wallet.accounts[0].algo, wallet.accounts[0].network)) return reject(false);

                  mainAccount.publicKey = nem.crypto.keyPair.create(mainAccount.privateKey).publicKey.toString();
                  resolve(mainAccount);
              }
          }, 10);
      }, (err) => {
          this._Alert.createWalletFailed(err);
          reject(false);
          console.log(err);
      });
    } );

  }


}
