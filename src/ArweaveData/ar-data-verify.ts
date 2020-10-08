import { Dependencies, DataItemJson, getSignatureData } from "./ar-data-base";

export const MAX_TAG_KEY_LENGTH_BYTES = 1024 * 1;
export const MAX_TAG_VALUE_LENGTH_BYTES = 1024 * 3;
export const MAX_TAG_COUNT = 128;

/**
 * Verifies a DataItem is valid.
 * 
 * @param deps 
 * @param d 
 * @param jwk 
 */
export async function verify(deps: Dependencies, d: DataItemJson): Promise<boolean> {
  
  // Try-catch all so malformed data like invalid base64 or something just returns false. 

  try {

    // Get signature data and signature present in di. 
    const signatureData = await getSignatureData(deps, d);
    const signatureBytes = deps.utils.b64UrlToBuffer(d.signature);

    // Verifiy Id is correct 
    const idBytes = await deps.crypto.hash(signatureBytes);
    const idOk = deps.utils.bufferTob64Url(idBytes) === d.id; 

    if (!idOk) {
      return false;
    }

    // Verify Signature is correct 
    const signatureOk = await deps.crypto.verify(d.owner, signatureData, signatureBytes);

    if (!signatureOk) {
      return false;
    }

    // Verify tags array is valid. 
    if (!verifyEncodedTagsArray(deps, d.tags)) {
      return false;
    }
    
    // Everything passed. 
    return true;

  }
  catch (e) {
    console.warn(e)
    return false;
  }

}

/**
 * 
 * Verify an array of tags only contains objects with exactly two keys, `name` and `value`
 * that they are both non-empty strings, and are with the bounds of tag sizes.
 * 
 * @param tags
 */
export function verifyEncodedTagsArray(deps: Dependencies, tags: any[]) {
  if (tags.length > MAX_TAG_COUNT) {
    return false;
  }
  // Search for something invalid.
  const invalid = tags.find(t => 
      Object.keys(t).length !== 2 
        || 
      typeof t.name !== 'string'
        || 
      typeof t.value !== 'string'
        ||
      !verifyEncodedTagSize(deps, t)
  );
  return !invalid;
}

/**
 * Verifies the tag name or value does not exceed reasonable bounds in bytes.
 * 
 * @param deps 
 * @param tag 
 */
export function verifyEncodedTagSize(deps: Dependencies, tag: { name: string, value: string } ) {

  const nameLen = deps.utils.b64UrlToBuffer(tag.name).length;
  if (nameLen < 1 || nameLen > MAX_TAG_KEY_LENGTH_BYTES) {
    return false;
  }

  const valueLen = deps.utils.b64UrlToBuffer(tag.value).length;
  if (valueLen < 1 || nameLen > MAX_TAG_VALUE_LENGTH_BYTES) {
    return false;
  }

  return true;
}