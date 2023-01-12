import { CustomWebpackConfiguration, WebpackConfiguration } from "./types";


const flatten = (data?: CustomWebpackConfiguration['entry'], prefix: string = '') => {
    if (typeof data !== 'object' || Array.isArray(data) || data?.import !== undefined) {
        return data;
    }

    var entry: any = {},
        path = (prefix) ? `${prefix}/` : '';

    for (var key in data) {
        let value: any = data[key];

        if (typeof value === 'object' && value?.import === undefined) {
            Object.assign(entry, flatten(value, `${path}${key}`));
        }
        else {
            entry[`${path}${key}`] = data[key];
        }
    }
    return entry as NonNullable< WebpackConfiguration['entry'] >;
};


export default flatten;