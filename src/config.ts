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

    if (webpack.output?.path) {
        webpack.output.path = path.resolve( webpack.output.path );
    }

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

config.library = (base: CustomWebpackConfiguration) => {
    base.output = base.output || {};
    base.output.path = base.output?.path || 'build';

    let node: any = structuredClone(base),
        web: any = structuredClone(base);

    node.entry = {
        index: base.entry
    };
    web.entry = {
        'index.browser': base.entry
    };

    return [
        config.node(node),
        config.web(web)
    ];
};

config.node = (base: Omit<CustomWebpackConfiguration, 'entry'> & { entry: Record<string, EntryObject> }) => {
    base.externals = [ externals() ];
    base.externalsPresets = { node: true };

    base.output = base.output || {};
    base.output.path = base.output?.path || 'build';

    base.target = 'node';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.sass();
        plugins.typescript({ transpileOnly: false });
    };

    return config.typescript(base);
};

config.web = (base: Omit<CustomWebpackConfiguration, 'entry'> & { entry: Record<string, EntryObject> }) => {
    base.output = base.output || {};
    base.output.path = base.output?.path || 'public';

    base.target = 'web';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.sass();
        plugins.typescript();
    };

    return config.typescript(base);
};

config.typescript = (base: Omit<CustomWebpackConfiguration, 'entry'> & { entry: Record<string, EntryObject> }) => {
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