import { CustomWebpackConfiguration } from "~/types";
import { entry as css } from './plugins/sass';
import { entry as js } from './plugins/typescript';


const flatten = (data: CustomWebpackConfiguration['entry'], prefix: string = '') => {
    if (typeof data !== 'object' || Array.isArray(data) || data?.import !== undefined) {
        return data;
    }

    var path = (prefix) ? `${prefix}/` : '',
        output: any = {};

    for (var key in data) {
        let value: any = data[key];

        if (typeof value === 'object' && value?.import === undefined) {
            Object.assign(output, flatten(value, `${path}${key}`));
        }
        else {
            output[`${path}${key}`] = data[key];
        }
    }

    return output;
}


export default { css, js };
export { flatten };