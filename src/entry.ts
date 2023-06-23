import { EntryObject } from 'webpack';
import { NestedConfiguration } from "~/types";
import path from '~/path';


function recursive(data: NestedConfiguration['entry'], prefix: string = '') {
    if (!data || Array.isArray(data) || typeof data !== 'object') {
        return data;
    }

    var entry: EntryObject = {},
        path = prefix ? `${prefix}/` : '';

    for (var key in data) {
        let value = data[key];

        // Value is `NestedConfiguration['entry']` | `EntryObject`
        // - IF value is not an `EntryItem` ( string[] | string )
        // - AND value.import does not exist
        if (!Array.isArray(value) && typeof value === 'object') {
            if (value?.import) {}
            else {
                Object.assign(entry, recursive(value as NestedConfiguration['entry'], `${path}${key}`));
                continue;
            }
        }

        entry[`${path}${key}`] = value as EntryObject[keyof EntryObject];
    }

    return entry;
}


// DO NOT ADD EXTENSION TO 'filename'
// - All files will receive the extension ( including bundled js files )
// - `mini-css-extract-plugin` plugin appends css extension once extracted
// - JS files created during bundle are left extensionless
// - Makes it easy to cleanup empty js files after build
const css = (pattern: string | string[], { hash }: { hash?: boolean } = {}) => {
    return {
        filename: `[${hash ? 'contenthash' : 'name'}]`,
        import: path.resolve(pattern)
    };
};

const flatten = (data: NestedConfiguration['entry']) => {
    return recursive(data);
};

const js = (pattern: string | string[], { hash }: { hash?: boolean } = {}) => {
    return {
        filename: `[${hash ? 'contenthash' : 'name'}].js`,
        import: path.resolve(pattern)
    };
};


export default { css, js };
export { flatten };