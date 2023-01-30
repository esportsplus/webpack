import { Configuration, CustomWebpackConfiguration } from '~/types';
import { flatten } from '~/entry';
import plugins from '~/plugins';
import path from 'node:path';


export default (base: CustomWebpackConfiguration) => {
    base.entry = flatten(base.entry);

    if (!['production', 'development'].includes(base.mode || '')) {
        base.mode = 'production';
    }

    base.module = base.module || {};
    base.module.rules = base.module?.rules || [];

    base.optimization = base.optimization || {};
    base.optimization.minimize = base.mode === 'production';
    base.optimization.minimizer = base.optimization.minimizer || [];

    base.output = base.output || {};

    if (base.output?.path) {
        base.output.path = path.resolve( base.output.path );
    }

    base.plugins = base.plugins || [];

    base.resolve = base.resolve || {};
    base.resolve.plugins = base.resolve.plugins || [];

    if (base.use) {
        base.use( plugins(base as Configuration) );
        delete base.use;
    }

    return base as Configuration;
};