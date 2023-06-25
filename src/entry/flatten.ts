import { EntryObject } from 'webpack';
import { NestedConfiguration } from "~/types";


const flatten = (entry: NestedConfiguration['entry'], hash: boolean, prefix = '') => {
    if (!entry || Array.isArray(entry) || typeof entry !== 'object') {
        return entry;
    }

    var output: EntryObject = {},
        path = prefix ? `${prefix}/` : '';

    for (var key in entry) {
        let value = entry[key];

        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            if (value?.import === undefined) {
                Object.assign(output, flatten(value as NestedConfiguration['entry'], hash, `${path}${key}`));
                continue;
            }
            else if (typeof value?.filename === 'string') {
                if (hash) {
                    value.filename = value.filename.replace('[name]', '[contenthash]');
                }

                if (value.filename.indexOf('[name]') === -1) {
                    value.filename = `${path}${value.filename}`;
                }
            }
        }

        output[`${path}${key}`] = value as EntryObject[keyof EntryObject];
    }

    return output;
};


export default flatten;