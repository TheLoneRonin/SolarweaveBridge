import { Dependencies, DataItemJson } from "./ar-data-base";

/**
 * Decode the data content of a DataItem, either to a string or Uint8Array of bytes 
 * 
 * @param deps 
 * @param d 
 * @param param2 
 */
export async function decodeData(deps: Dependencies, d: DataItemJson, options: { string: boolean } = { string: false }): Promise<string | Uint8Array> {
  if (options.string) {
    return deps.utils.b64UrlToString(d.data);
  } else {
    return deps.utils.b64UrlToBuffer(d.data);
  }
}

/**
 * Decode an individual tag from a DataItem. Always decodes name and value as strings
 * 
 * @param deps
 * @param tag 
 */
export async function decodeTag(deps: Dependencies, tag: { name: string, value: string} ) {
  return { name: deps.utils.b64UrlToString(tag.name), value: deps.utils.b64UrlToString(tag.value)}
}

/**
 * Decodes an individual tag from a DataItem at index. Throws if index is out of bounds.
 * 
 */
export async function decodeTagAt(deps: Dependencies, d: DataItemJson, index: number) {
  if (d.tags.length < index-1) { 
    throw new Error(`Invalid index ${index} when tags array has ${d.tags.length} tags`);
  }
  return decodeTag(deps, d.tags[index]);
}

/**
 * Unpack all tags in a DataItem into a key value map of 
 * 
 * `name: string | string[]`  
 * 
 * Always decodes as string values, maintains the order 
 * the tags were seriliazed in when converting a collection 
 * of tags with the same key.
 * 
 * @param deps 
 * @param d 
 */
export async function unpackTags(deps: Dependencies, d: DataItemJson): Promise<Record<string, (string | string[])>> {
  const tags: Record<string, (string | string[])> = {}
  
  for (let i = 0; i < d.tags.length; i++) {
    const { name, value } = await decodeTag(deps, d.tags[i]);
    if (!tags.hasOwnProperty(name)) {
      tags[name] = value; 
      continue;
    }
    tags[name] = [ ...tags[name], value ]
  }
  return tags;
}