
/**
 * Encoding and decoding utils. ( Partial Interface of the Arweave utils )
 * 
 * These utils convert to and from
 * 
 * - Js strings to and from utf-8 byte arrays
 * - byte arrays to and from base64url encoded strings 
 * - Js strings to and from base64url encoded encoded strings of utf-8 encoded byte strings
 */
export interface ArweaveUtils {

  stringToBuffer: stringToBuffer
  bufferToString: bufferToString
  
  bufferTob64Url: bufferTob64Url
  b64UrlToBuffer: b64UrlToBuffer

  b64UrlToString: b64UrlToString
  stringToB64Url: stringToB64Url
}

/**
 * Encodes a javascript string to a UTF-8 byte array
 */
export type stringToBuffer = (string: string) => Uint8Array

/**
 * Decodes a UTF-8 encoded byte array to a javascript string. 
 */
export type bufferToString = (buffer: Uint8Array | ArrayBuffer) => string

/**
 * Encodees a byte array to a base64url string
 */
export type bufferTob64Url = (buffer: Uint8Array) => string

/**
 * Decodes a base64url string to a byte array.
 */
export type b64UrlToBuffer = (b64UrlString: string) => Uint8Array

/**
 * Encodes a string to a UTF-8 buffer and encodes that as base64url
 */
export type stringToB64Url = (string: string) => string 

/**
 * Decoded a base64url string as UTF-8 and then to a JavaScript string 
 */
export type b64UrlToString = (b64UrlString: string) => string


