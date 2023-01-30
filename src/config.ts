import { Configuration, CustomWebpackConfiguration, StrictWebpackConfiguration } from './types';
import { flatten } from './entry';
import plugins from './plugins';
import path from 'node:path';


const config = (base: CustomWebpackConfiguration) => {
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

config.node = (base: StrictWebpackConfiguration) => {
    // IMPORTANT!
    // - We're bundling node server apps with modules until es module support is better
    base.externalsPresets = { node: true };

    base.output = base.output || {};
    base.output.path = base.output?.path || 'build';

    base.target = 'node';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.typescript();
    };

    return config(base);
};

config.web = (base: StrictWebpackConfiguration) => {
    base.output = base.output || {};
    base.output.path = base.output?.path || 'public';

    base.target = 'web';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.typescript();

        plugins.web.fonts();
        plugins.web.images();
        plugins.web.json();
        plugins.web.sass();
        plugins.web.server();
        plugins.web.svg({
            inline: 'storage/svg'
        });
        plugins.web.txt();
    };

    return config(base);
};


export default config;