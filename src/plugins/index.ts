import { Configuration } from '~/types';
import favicon from './favicon';
import fonts from './fonts';
import html from './html';
import json from './json';
import server from './server';
import sass from './sass';
import source from './source';
import typescript from './typescript';


type Fn<F> = F extends (ignore: any, ...args: infer P) => infer R ? (...args: P) => R : never;

type Plugins = {
    favicon: Fn<typeof favicon>;
    fonts: Fn<typeof fonts>;
    html: Fn<typeof html>;
    json: Fn<typeof json>;
    sass: Fn<typeof sass>;
    server: Fn<typeof server>;
    source: Fn<typeof source>;
    typescript: Fn<typeof typescript>;
};


let plugins = { favicon, fonts, html, json, sass, server, source, typescript };


export default (webpack: Configuration) => {
    let methods: any = {},
        used: Record<string, boolean> = {};

    for (let key of Object.keys(plugins)) {
        methods[key] = (value: any) => {
            if (used[key]) {
                return;
            }

            plugins[key as keyof Plugins](webpack, value);
            used[key] = true;
        };
    }

    return methods as Plugins;
};