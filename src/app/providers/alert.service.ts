import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { FiltersService } from '../providers/filters.service';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private  _ngToast: ToastrService,
    private translate: TranslateService,
    private filter: FiltersService
  ) { }

  /***
   * Error alerts
   */
  missingFormData() {
      this.translate.get('ALERT_MISSING_FORM_DATA').subscribe((res: string) => {
        this._ngToast.error(res);
      });
  }

  errorWalletDownload() {
    this.translate.get('ALERT_ERROR_WALLET_DOWNLOAD').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  passwordsNotMatching() {
    this.translate.get('ALERT_PASSWORDS_NOT_MATCHING').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidKeyForAddress() {
    this.translate.get('ALERT_INVALID_KEY_FOR_ADDR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  noWalletLoaded() {
    this.translate.get('ALERT_NO_WALLET_LOADED').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  walletNameExists() {
    this.translate.get('ALERT_WALLET_NAME_EXISTS').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidWalletFile() {
    this.translate.get('ALERT_INVALID_WALLET_FILE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidCustomNode() {
    this.translate.get('ALERT_INVALID_CUSTOM_NODE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidWebsocketPort() {
    this.translate.get('ALERT_INVALID_WEBSOCKET_PORT').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  websocketError(message) {
    this._ngToast.error(message);
  }

  mijinDisabled() {
    this.translate.get('ALERT_MIJIN_DISABLED').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  getNamespacesByIdError(message) {
    this.translate.get('ALERT_GET_ACCOUNT_DATA_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  getAccountDataError(message) {
    this.translate.get('ALERT_GET_ACCOUNT_DATA_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  invalidAddressForNetwork(address, network) {
    this.translate.get('ALERT_ERROR_OCCURRED').subscribe((res1:string) => {
      this.translate.get('ALERT_INVALID_ADDR_FOR_NETWORK').subscribe((res2:string) => {
        this._ngToast.error(res1+address+res2+'('+network+') !');
      });
    });
  }

  invalidPassword() {
    this.translate.get('ALERT_INVALID_PASSWORD').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  transactionError(message) {
    this._ngToast.error(message);
  }

  cosignatoryAlreadyPresentInList() {
    this.translate.get('ALERT_COSIG_ALREADY_IN_LIST').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  cosignatoryhasNoPubKey() {
    this.translate.get('ALERT_COSIGNATORY_HAS_NO_PUBLIC').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  multisighasNoPubKey() {
    this.translate.get('ALERT_MULTISIG_HAS_NO_PUBLIC').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  cosignatoryCannotBeMultisig() {
    this.translate.get('ALERT_COSIG_CANNOT_BE_MULTISIG').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  noNamespaceOwned() {
    this.translate.get('ALERT_NO_NS_OWNED').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  unlockedInfoError() {
    this.translate.get('ALERT_UNLOCKED_INFO_ERROR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  lockError(message) {
    this.translate.get('ALERT_LOCK_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  unlockError(message) {
    this.translate.get('ALERT_UNLOCK_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  supernodesError() {
    this.translate.get('ALERT_SUPERNODES_ERROR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidNtyFile() {
    this.translate.get('ALERT_INVALID_NTY_FILE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  createWalletFailed(err) {
    this.translate.get('ALERT_CREATE_WALLET_FAILED').subscribe((res:string) => {
      this._ngToast.error(res+err);
    });
  }

  derivationFromSeedFailed(err) {
    this.translate.get('ALERT_DERIVATION_FROM_SEED_FAILED').subscribe((res:string) => {
      this._ngToast.error(res+err);
    });
  }

  bip32GenerationFailed(err) {
    this.translate.get('ALERT_BIP32_GENERATION_FAILED').subscribe((res:string) => {
      this._ngToast.error(res+err);
    });
  }

  noWalletData() {
    this.translate.get('ALERT_NO_WALLET_DATA').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  cantLoginWithoutWallet() {
    this.translate.get('ALERT_CANNOT_LOGIN_WITHOU_WALLET').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  noWalletToSet() {
    this.translate.get('ALERT_NO_WALLET_TO_SET').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidWalletIndex() {
    this.translate.get('ALERT_INVALID_WALLET_INDEX').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  noCurrentWallet() {
    this.translate.get('ALERT_NO_CURRENT_WALLET').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  alreadyMultisig() {
    this.translate.get('ALERT_ALREADY_MULTISIG').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidModificationArray() {
    this.translate.get('ALERT_INVALID_MODIFICATION_ARRAY').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  errorGetMarketInfo() {
    this.translate.get('ALERT_GET_MARKET_INFO_ERROR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  multisigCannotBeCosignatory() {
    this.translate.get('ALERT_MULTISIG_CANNOT_BE_COSIG').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  purgeCancelled() {
    this.translate.get('ALERT_PURGE_CANCELLED').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  mainnetDisabled() {
    this.translate.get('ALERT_MAINNET_DISABLED').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  emptyDecodedMessage() {
    this.translate.get('ALERT_EMPTY_DECODED_MSG').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidNamespaceName() {
    this.translate.get('ALERT_INVALID_NS_NAME').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidMosaicName() {
    this.translate.get('ALERT_INVALID_MOSAIC_NAME').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidMosaicDescription() {
    this.translate.get('ALERT_MOSAIC_DESCRIPTION').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  errorFetchingIncomingTxes(message) {
    this.translate.get('ALERT_GET_INCOMING_TXES_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  connectionError() {
    this.translate.get('GENERAL_CONNECTION_ERROR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  errorGetMosaicsDefintions(message) {
    this.translate.get('GENERAL_CONNECTION_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  errorGetSubNamespaces(message) {
    this.translate.get('ALERT_GET_SUB_NS_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  errorGetMosaics(message) {
    this.translate.get('ALERT_GET_MOSAICS_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  errorGetTransactions(message) {
    this.translate.get('ALERT_GET_TRANSACTIONS_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  invalidAddressBookFile() {
    this.translate.get('ALERT_INVALID_ADDRESS_BOOK_FILE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  // TODO: not setup timeout
  namespaceExpiryNotice(ns, blocks) {
    this.translate.get('RENEW_NS_ALERT_PART_1').subscribe((res1:string) => {
      this.translate.get('RENEW_NS_ALERT_PART_2').subscribe((res2:string) => {
        this.translate.get('GENERAL_BLOCKS').subscribe((res3:string) => {
          this.translate.get('RENEW_NS_ALERT_PART_3').subscribe((res4:string) => {
            this._ngToast.warning(res1+" <b>"+ns+"</b>"+res2+" (~"+blocks+" "+res3+"). "+res4);
          });
        });
      });
    });
  }

  invalidAddress(addr) { // not using addr
    this.translate.get('ALERT_INVALID_ADDRESS').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidAmount() {
    this.translate.get('ALERT_INVALID_AMOUNT').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  invalidPrivateKey() {
    this.translate.get('ALERT_INVALID_PRIVATE_KEY').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  fileSizeError(filename) { // not using filename
    this.translate.get('ALERT_FILE_SIZE_ERROR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  noPublicKeyForDecoding() {
    this.translate.get('ALERT_MESSAGE_DECODE_KEY_ERROR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  errorGetTimeSync() {
    this.translate.get('ALERT_FETCH_TIME_SYNC_ERROR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  errorGetBtcPrice() {
    this.translate.get('ALERT_BTC_MARKET_ERROR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  errorMultisigMinSignature() {
    this.translate.get('ALERT_MULTISIG_MIN_SIGNATURE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  cosignatoryRemovalLimit() {
    this.translate.get('ALERT_COSIG_REMOVAL_LIMIT').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  errorMultisigMinSignatureInvalid() {
    this.translate.get('ALERT_MULTISIG_MIN_SIGNATURE_INVALID').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  recipientHasNoPublicKey() {
    this.translate.get('ALERT_RECIPIENT_PUBLIC_KEY').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  noEncryptionWithMultisig() {
    this.translate.get('ALERT_ENCRYPT_MULTISIG').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  brainPasswordTooShort() {
    this.translate.get('ALERT_BRAIN_PASSWORD_TOO_SHORT').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  nodeSeemsOffline() {
    this.translate.get('ALERT_NODE_SEEMS_OFFLINE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  passphraseIsWeak() {
    this.translate.get('ALERT_WEAK_PASSPHRASE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  brainWalletUpgrade() {
    this.translate.get('ALERT_BRAIN_WALLET_UPGRADE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  exchangeNeedsMessage() {
    this.translate.get('ALERT_EXCHANGE_NEEDS_MESSAGE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  contactAlreadyInAddressBook() {
    this.translate.get('ALERT_ACCOUNT_ALREADY_IN_ADDRESS_BOOK').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  maxMosaicSupply() {
    this.translate.get('ALERT_MAX_MOSAIC_SUPPLY').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  getMosaicSupplyError(message) {
    this.translate.get('ALERT_GET_MOSAIC_SUPPLY_ERROR').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  votingUnexpectedError(err) {
    this._ngToast.error(err);
  }

  votingError() {
    this.translate.get('ALERT_VOTING_ERROR').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  noEncryptedMessageOffline() {
    this.translate.get('ALERT_ENCRYPTED_MSG_OFFLINE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  insufficientBalance() {
    this.translate.get('ALERT_INSUFFICIENT_BALANCE').subscribe((res:string) => {
      this._ngToast.error(res);
    });
  }

  dnsNoInfoFound(message) {
    this.translate.get('ALERT_DNS_NO_INFO_FOUND').subscribe((res:string) => {
      this._ngToast.error(res+message);
    });
  }

  getCurrentHeightError() {
    this.translate.get('GENERAL_ERROR').subscribe( (res:string) => {
      this._ngToast.error(res);
     });
  }

  /***
   * Success alerts
   */
  createWalletSuccess() {
    this.translate.get('ALERT_CREATE_WALLET_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  successPurge() {
    this.translate.get('ALERT_SUCCESS_PURGE').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  successLogout() {
    this.translate.get('ALERT_SUCCESS_LOGOUT').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  loadWalletSuccess() {
    this.translate.get('ALERT_LOAD_WALLET_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  transactionSuccess() {
    this.translate.get('ALERT_TRANSACTION_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  generateNewAccountSuccess() {
    this.translate.get('ALERT_GENERATE_ACCOUNT_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  upgradeSuccess() {
    this.translate.get('ALERT_UPGRADE_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  transactionSignatureSuccess() {
    this.translate.get('ALERT_SIGNATURE_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  ntyFileSuccess() {
    this.translate.get('ALERT_NTY_FILE_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  addressBookFileSuccess() {
    this.translate.get('ALERT_ADDRESS_BOOK_FILE_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  pollCreationSuccess() {
    this.translate.get('ALERT_POLL_CREATION_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  votingSuccess() {
    this.translate.get('ALERT_VOTING_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  signedTxCopySuccess() {
    this.translate.get('ALERT_COPY_SIGNED_TX_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  signedMsgCopySuccess() {
    this.translate.get('ALERT_COPY_SIGNED_MSG_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res);
    });
  }

  dnsMsgSuccess(message) {
    this.translate.get('ALERT_DNS_SUCCESS').subscribe((res:string) => {
      this._ngToast.success(res+message);
    });
  }

  /***
   * Transaction notifications
   */
  incomingTransaction(signer, network) {
    this.translate.get('ALERT_INCOMING_TX_FROM').subscribe((res1:string) => {
      let res2 = this.filter.fmtPubToAddress(signer, network);
      this._ngToast.success(res1+res2);
    });
  }

  /***
   * Other
   */

  dismiss() {
      //this._ngToast.dismiss();
  }

}
