import { EntryObject } from 'webpack';
import { NestedConfiguration } from "~/types";
import path from '~/path';


function recursive(entry: NestedConfiguration['entry'], hash: boolean, prefix: string = '') {
    if (!entry || Array.isArray(entry) || typeof entry !== 'object') {
        return entry;
    }

    var output: EntryObject = {},
        path = prefix ? `${prefix}/` : '';

    for (var key in entry) {
        let value = entry[key];

        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            if (value?.import === undefined) {
                Object.assign(output, recursive(value as NestedConfiguration['entry'], hash, `${path}${key}`));
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
}


// DO NOT ADD EXTENSION TO 'filename'
// - All files will receive the extension ( including bundled js files )
// - `mini-css-extract-plugin` plugin appends css extension once extracted
// - JS files created during bundle are left extensionless
// - Makes it easy to cleanup empty js files after build
const css = (pattern: string | string[]) => {
    return {
        filename: '[name]',
        import: path.resolve(pattern)
    };
};

const flatten = (entry: NestedConfiguration['entry'], production: boolean) => {
    return recursive(entry, production);
};

const js = (pattern: string | string[]) => {
    return {
        filename: '[name].js',
        import: path.resolve(pattern)
    };
};


export default { css, js };
export { flatten };