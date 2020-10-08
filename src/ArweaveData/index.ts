import { Dependencies } from './ar-data-base';

import { getSignatureData, DataItemJson } from './ar-data-base';
import { createData, sign, addTag, DataItemCreateOptions } from './ar-data-create';
import { decodeData, decodeTag, decodeTagAt, unpackTags } from './ar-data-read';
import { bundleData, unbundleData } from './ar-data-bundle'
import { verify  } from './ar-data-verify';

export { createData as create, sign, decodeData, decodeTag, decodeTagAt, unpackTags, verify, DataItemCreateOptions, DataItemJson, getSignatureData }

export default function ArweaveData(deps: Dependencies) {
  return {
    createData: createData.bind(null, deps),
    sign: sign.bind(null, deps),
    addTag: addTag.bind(null, deps),
    verify: verify.bind(null, deps),
    decodeData: decodeData.bind(null, deps),
    decodeTag: decodeTag.bind(null, deps),
    decodeTagAt: decodeTagAt.bind(null, deps),
    unpackTags: unpackTags.bind(null, deps),
    bundleData: bundleData.bind(null, deps),
    unbundleData: unbundleData.bind(null, deps),
  }
}
