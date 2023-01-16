import { Configuration } from '~/types';
import favicon from './favicon';
import fonts from './fonts';
import html from './html';
import images from './images';
import json from './json';
import server from './server';
import sass from './sass';
import txt from './txt';
import svg from './svg';
import typescript from './typescript';


type Fn<F> = F extends (ignore: any, ...args: infer P) => infer R ? (...args: P) => R : never;

type Plugins = {
    favicon: Fn<typeof favicon>;
    fonts: Fn<typeof fonts>;
    html: Fn<typeof html>;
    images: Fn<typeof images>;
    json: Fn<typeof json>;
    sass: Fn<typeof sass>;
    server: Fn<typeof server>;
    svg: Fn<typeof svg>;
    txt: Fn<typeof txt>;
    typescript: Fn<typeof typescript>;
};


let plugins = { favicon, fonts, html, images, json, sass, server, svg, txt, typescript };


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