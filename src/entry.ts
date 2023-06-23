import { EntryObject } from 'webpack';
import { NestedConfiguration } from "~/types";
import path from './path';


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


const entry = (pattern: string | string[]) => {
    return path.resolve(pattern);
};

const flatten = (data: NestedConfiguration['entry']) => {
    return recursive(data);
}


export default entry;
export { flatten };