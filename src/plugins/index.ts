import { Configuration } from '~/types';
import node from './node';
import web from './web';


type Function = (...args: any[]) => void;

type Infer<T> =
    T extends NestedFunction
        ? { [K in keyof T]: Infer<T[K]> }
        : T extends (_: any, ...args: infer A) => infer R
            ? (...args: A) => R
            : never;

interface NestedFunction {
    [key: string]: Function | NestedFunction
};


let plugins = { node, web };


function factory(methods: any, nested: NestedFunction, prefix: string, used: Record<string, boolean>, webpack: Configuration) {
    for (let key in nested) {
        let plugin = nested[key];

        if (typeof plugin !== 'function') {
            factory((methods[key] = {}), plugin, `${key}.`, used, webpack);
            continue;
        }

        methods[key] = (value: any) => {
            if (used[`${prefix}${key}`]) {
                return;
            }

            (plugin as Function)(webpack, value);
            used[`${prefix}${key}`] = true;
        };
    }

    return methods;
}


export default (webpack: Configuration) => {
    return factory({}, plugins, '', {}, webpack) as Infer<typeof plugins>;
}