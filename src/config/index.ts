import { Configuration, NestedConfiguration } from '~/types';
import { flatten } from '~/entry';
import path from 'node:path';
import plugins from '~/plugins';
import node from './node';
import web from './web';


function config(base: NestedConfiguration) {
    if (base.mode === 'production') {
        base.devtool = false;
    }

    base.entry = flatten(base.entry, base.mode === 'production');

    base.module ??= {};
    base.module.rules ??= [];

    base.optimization ??= {};
    base.optimization.minimize ??= base.mode === 'production';
    base.optimization.minimizer ??= [];

    base.output ??= {};
    base.output.pathinfo ??= false;

    if (base.output?.path) {
        base.output.path = path.resolve( base.output.path );
    }

    base.plugins ??= [];

    base.resolve ??= {};
    base.resolve.plugins ??= [];

    if (base.use) {
        base.use( plugins(base as Configuration) );
        delete base.use;
    }

    return base as Configuration;
}
config.node = node;
config.web = web;


export default config;