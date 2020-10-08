import { deepHash } from './interface-deep-hash';
import { ArweaveUtils } from './interface-utils';
import { CryptoInterface } from './interface-crypto';

/**
 * The depdencies needed for operating on DataItems
 * These methods and interfaces are all available in arweave-js 
 */
export interface Dependencies {
  crypto: CryptoInterface
  utils: ArweaveUtils
  deepHash: deepHash
}

/**
 * Serialized format of a DataItem. Json.
 */
export class DataItemJson {
  owner: string = ''
  target: string = ''
  nonce: string = ''
  tags: { name: string, value: string }[] = []
  data: string = ''
  signature: string = ''
  id: string = ''
}

/**
 * Return the message that should be signed to produce a valid signature
 *  
 * @param deps 
 * @param d 
 */
export async function getSignatureData(deps: Dependencies, d: DataItemJson): Promise<Uint8Array> {
  return deps.deepHash([
    deps.utils.stringToBuffer('dataitem'),
    deps.utils.stringToBuffer('1'),
    deps.utils.b64UrlToBuffer(d.owner),
    deps.utils.b64UrlToBuffer(d.target),
    deps.utils.b64UrlToBuffer(d.nonce),
    [
      ...d.tags.map(tag => 
        [ deps.utils.b64UrlToBuffer(tag.name), deps.utils.b64UrlToBuffer(tag.value ) ]
      )
    ],
    deps.utils.b64UrlToBuffer(d.data)
  ])
}


