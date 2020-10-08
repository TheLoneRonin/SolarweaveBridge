import { Dependencies } from './ar-data-base';
import { getSignatureData, DataItemJson } from './ar-data-base';
import { createData, sign, DataItemCreateOptions } from './ar-data-create';
import { decodeData, decodeTag, decodeTagAt, unpackTags } from './ar-data-read';
import { verify } from './ar-data-verify';
export { createData as create, sign, decodeData, decodeTag, decodeTagAt, unpackTags, verify, DataItemCreateOptions, DataItemJson, getSignatureData };
export default function ArweaveData(deps: Dependencies): {
    createData: any;
    sign: any;
    addTag: any;
    verify: any;
    decodeData: any;
    decodeTag: any;
    decodeTagAt: any;
    unpackTags: any;
    bundleData: any;
    unbundleData: any;
};
