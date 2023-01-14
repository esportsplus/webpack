import { Configuration, CustomWebpackConfiguration } from './types';
import { flatten } from './entry';
import plugins from './plugins';
import path from 'path';


function parse(webpack: CustomWebpackConfiguration) {
    webpack.entry = flatten(webpack.entry);

    if (!['production', 'development'].includes(webpack.mode || '')) {
        webpack.mode = 'production';
    }

    webpack.module = webpack.module || {};
    webpack.module.rules = webpack.module?.rules || [];

    webpack.optimization = webpack.optimization || {};
    webpack.optimization.minimize = webpack.mode === 'production';

    webpack.output = webpack.output || {};
    webpack.output.path = path.resolve( webpack.output?.path || 'public' );

    webpack.plugins = webpack.plugins || [];

    webpack.resolve = webpack.resolve || {};
    webpack.resolve.plugins = webpack.resolve.plugins || [];

    let use = webpack.use;

    delete webpack.use;

    return { use, webpack: webpack as Configuration };
}


const config = (base: CustomWebpackConfiguration) => {
    let { use, webpack } = parse(base);

    if (use) {
        use( plugins(webpack) );
    }

    return webpack;
};

config.web = (base: CustomWebpackConfiguration) => {
    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.sass();
    };

    return config.typescript(base);
};

config.typescript = (base: CustomWebpackConfiguration) => {
    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.fonts();
        plugins.server();
        plugins.source();
        plugins.typescript();
    };

    return config(base);
};


export default config;