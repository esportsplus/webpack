import { default as RemoveEmptyScriptsPlugin } from 'webpack-remove-empty-scripts';
import { Configuration, NestedConfiguration } from '~/types';
import { flatten } from '~/entry';
import plugins from '~/plugins';
import path from 'node:path';
import css from './css';
import node from './node';
import web from './web';


function config(base: NestedConfiguration) {
    base.cache ??= {
        type: 'filesystem'
    };

    if (base.mode === 'production') {
        base.devtool = false;
    }
    else {
        base.snapshot ??= {};
        base.snapshot.managedPaths ??= [];
    }

    base.entry = flatten(base.entry, base.contenthash !== false && base.mode === 'production');

    delete base.contenthash;

    base.module ??= {};
    base.module.rules ??= [];

    base.optimization ??= {};
    base.optimization.minimizer ??= [];

    base.output ??= {};
    base.output.path = path.resolve( base.output.path || 'build' );
    base.output.pathinfo ??= false;

    base.plugins ??= [];
    base.plugins.push(
        new RemoveEmptyScriptsPlugin({
            remove: /^([^.]*|(.+)\.js)$/
        })
    );

    base.resolve ??= {};
    base.resolve.plugins ??= [];

    if (base.use) {
        base.use( plugins(base as Configuration) );
        delete base.use;
    }

    return base as Configuration;
}

config.css = css;
config.node = node;
config.web = web;


export default config;