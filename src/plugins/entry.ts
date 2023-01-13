import { Configuration, CustomWebpackConfiguration } from "~/types";


function entry(data: CustomWebpackConfiguration['entry'], prefix: string = '') {
    if (typeof data !== 'object' || Array.isArray(data) || data?.import !== undefined) {
        return data;
    }

    var path = (prefix) ? `${prefix}/` : '',
        output: any = {};

    for (var key in data) {
        let value: any = data[key];

        if (typeof value === 'object' && value?.import === undefined) {
            Object.assign(output, entry(value, `${path}${key}`));
        }
        else {
            output[`${path}${key}`] = data[key];
        }
    }

    return output;
}


export default (webpack: Configuration, data: CustomWebpackConfiguration['entry']) => {
    webpack.entry = entry(data);
};