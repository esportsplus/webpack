import { Configuration, CustomWebpackConfiguration, EntryObject } from './types';
import { flatten } from './entry';
import externals from 'webpack-node-externals';
import plugins from './plugins';
import path from 'node:path';


type StrictWebpackConfiguration = Omit<CustomWebpackConfiguration, 'entry'> & { entry: Record<string, EntryObject> };


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

config.node = (base: StrictWebpackConfiguration) => {
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

config.web = (base: StrictWebpackConfiguration) => {
    base.output = base.output || {};
    base.output.path = base.output?.path || 'public';

    base.target = 'web';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.fonts();
        plugins.images();
        plugins.json();
        plugins.sass();
        plugins.server();
        plugins.svg({
            inline: 'storage/svg'
        });
        plugins.txt();
        plugins.typescript();
    };

    return config.typescript(base);
};

config.typescript = (base: StrictWebpackConfiguration) => {
    return config(base);
};


export default config;