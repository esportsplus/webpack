import { CustomWebpackConfiguration, EntryObject } from "~/types";
import { entry as css } from './plugins/sass';
import { entry as js } from './plugins/typescript';


function recursive(data: EntryObject, prefix: string = '') {
    var path = prefix ? `${prefix}/` : '',
        output: any = {};

    for (var key in data) {
        let value: any = data[key];

        if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
            if (value?.filename === undefined) {
                Object.assign(output, recursive(value, `${path}${key}`));
                continue;
            }
            else if (value.filename.indexOf('[name]') === -1) {
                value.filename = `${path}${value.filename}`;
            }
        }

        output[`${path}${key}`] = value;
    }

    return output;
}


const flatten = (data: CustomWebpackConfiguration['entry']) => {
    if (typeof data === 'object' && !Array.isArray(data) && data !== null) {
        return recursive(data as EntryObject);
    }

    return data;
}


export default { css, js };
export { flatten };