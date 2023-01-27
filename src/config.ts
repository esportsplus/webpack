import { Configuration, CustomWebpackConfiguration, EntryObject } from './types';
import { flatten } from './entry';
import externals from 'webpack-node-externals';
import plugins from './plugins';
import path from 'node:path';


function parse(webpack: CustomWebpackConfiguration) {
    webpack.entry = flatten(webpack.entry);

    if (!['production', 'development'].includes(webpack.mode || '')) {
        webpack.mode = 'production';
    }

    webpack.module = webpack.module || {};
    webpack.module.rules = webpack.module?.rules || [];

    webpack.optimization = webpack.optimization || {};
    webpack.optimization.minimize = webpack.mode === 'production';
    webpack.optimization.minimizer = webpack.optimization.minimizer || [];

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

config.library = function(base: Exclude<CustomWebpackConfiguration, EntryObject>) {
    base.output = base.output || {};
    base.output.path = base.output?.path || 'build';

    let node = structuredClone(base),
        web = structuredClone(base);

    node.entry = {
        index: base.entry
    };
    web.entry = {
        'index.browser': base.entry
    };

    return [
        this.node(node),
        this.web(web)
    ];
};

config.node = (base: CustomWebpackConfiguration) => {
    let previous = base.use;

    base.externals = [ externals() ];
    base.externalsPresets = { node: true };
    base.target = 'node';

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.sass();
        plugins.typescript({ transpileOnly: false });
    };

    return config.typescript(base);
};

config.web = (base: CustomWebpackConfiguration) => {
    let previous = base.use;

    base.target = 'web';
    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.sass();
        plugins.typescript();
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
        plugins.images();
        plugins.json();
        plugins.server();
        plugins.svg({
            inline: 'storage/svg'
        });
        plugins.txt();
    };

    return config(base);
};


export default config;