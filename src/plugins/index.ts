import { Configuration } from '~/types';
import copy from './copy';
import entry from './entry';
import favicon from './favicon';
import fonts from './fonts';
import html from './html';
import mode from './mode';
import server from './server';
import sass from './sass';
import source from './source';
import typescript from './typescript';


type Fn<T extends (...args: any[]) => void> = (value: Parameters<T>[1]) => void;

type Options = {
    copy: Fn<typeof copy>;
    entry: Fn<typeof entry>;
    favicon: Fn<typeof favicon>;
    fonts: VoidFunction;
    html: Fn<typeof html>;
    mode: Fn<typeof mode>;
    sass: VoidFunction;
    server: Fn<typeof server>;
    source: VoidFunction;
    typescript: Fn<typeof typescript>;
};


export default (webpack: Configuration): Options => {
    return {
        copy:       (value) => copy(webpack, value),
        entry:      (value) => entry(webpack, value),
        favicon:    (value) => favicon(webpack, value),
        fonts:      (     ) => fonts(webpack),
        html:       (value) => html(webpack, value),
        mode:       (value) => mode(webpack, value),
        sass:       (     ) => sass(webpack),
        server:     (value) => server(webpack, value),
        source:     (     ) => source(webpack),
        typescript: (value) => typescript(webpack, value)
    };
};