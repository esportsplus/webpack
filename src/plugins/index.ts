import { Configuration } from '~/types';
import favicon from './favicon';
import fonts from './fonts';
import html from './html';
import images from './images';
import json from './json';
import polyfill from './polyfill';
import server from './server';
import sass from './sass';
import txt from './txt';
import svg from './svg';
import typescript from './typescript';


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


let plugins = { favicon, fonts, html, images, json, polyfill, sass, server, svg, txt, typescript };


function factory(methods: any, nested: NestedFunction, prefix: string, used: Record<string, boolean>, webpack: Configuration) {
    for (let key in nested) {
        let plugin = nested[key];

        if (typeof plugin !== 'function') {
            factory((methods[key] = {}), plugin[key] as NestedFunction, `${key}.`, used, webpack);
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


export default (webpack: Configuration) => factory({}, plugins, '', {}, webpack) as Infer<typeof plugins>;