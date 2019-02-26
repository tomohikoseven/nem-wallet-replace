/** @module utils/CryptoHelpers */

import { CryptoHelpersLegacy } from './CryptoHelpersLegacy';
import nem from 'nem-sdk';

import { BIP32Data } from '../class';

export class CryptoHelpers {

    /**
     * Create BIP32 data
     *
     * @param {string} childKey - A child private key
     * @param {number} network - A network
     *
     * @return {object} - The BIP32 data
     */
    static createBIP32Data(childKey: string, network: number) {
        let privateKey = nem.utils.helpers.fixPrivateKey(childKey);

        let keyPair = nem.crypto.keyPair.create(privateKey);
        let publicKey = keyPair.publicKey.toString();
        let address = nem.model.address.toAddress(publicKey, network);

        return {
            address,
            privateKey,
            publicKey,
        };
    }

    /**
     * Generate BIP32 data
     *
     * @param {string} privateKey - A private key
     * @param {string} password - A wallet password
     * @param {number} index - A derivation index
     * @param {number} network - A network
     *
     * @return {object|promise} - The BIP32 data or promise error
     */
    static generateBIP32Data(privateKey:string, password:string, index:number, network:number) {
        return new Promise((resolve, reject) => {
            if (!privateKey) return reject("No private key");
            if (!nem.utils.helpers.isPrivateKeyValid(privateKey)) return reject("Private key is invalid");
            if (!password) return reject("No password");
            if (!network) return reject("No network");

            let childKey = CryptoHelpersLegacy.generateBIP32Data(privateKey, password, index);

            let data = this.createBIP32Data(childKey, network);

            resolve(data);
        });
    }
}

