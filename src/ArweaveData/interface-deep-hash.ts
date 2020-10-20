/**
 * DeepHashChunk recusrive type. 
 */
type DeepHashChunk = Uint8Array | DeepHashChunks;
interface DeepHashChunks extends Array<DeepHashChunk> {}

/**
 * deep hash function
 */
export type deepHash = (chunk: DeepHashChunk) => Promise<Uint8Array>

