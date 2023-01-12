import { Configuration, NestedEntry, Options, WebpackConfiguration } from './types';
import entry from './entry';
import plugins from './plugins';
import resolve from './resolve';
import flatten from './flatten';


function normalize(webpack: WebpackConfiguration, { production, tsconfig }: Options) {
    webpack.entry = flatten(webpack.entry);

    webpack.mode = (`${production}` !== 'false') ? 'production' : 'development';

    webpack.module = webpack.module || {};
    webpack.module.rules = webpack.module?.rules || [];

    webpack.optimization = webpack.optimization || {};
    webpack.optimization.minimize = webpack.mode === 'production';

    webpack.output = webpack.output || {};
    webpack.output.path = resolve.path( webpack.output?.path || 'public' );

    webpack.plugins = webpack.plugins || [];

    webpack.resolve = webpack.resolve || {};
    webpack.resolve.plugins = webpack.resolve.plugins || [];

    tsconfig = resolve.path( tsconfig || 'tsconfig.json' );

    return { tsconfig, webpack: webpack as Configuration };
}


const config = (base: WebpackConfiguration & { entry: NestedEntry }, options: Options) => {
    let { favicon, copy, html, server } = options,
        { tsconfig, webpack } = normalize(base, options);

    plugins.copy(webpack, copy);
    plugins.favicon(webpack, favicon);
    plugins.fonts(webpack);
    plugins.html(webpack, html);
    plugins.sass(webpack);
    plugins.server(webpack, server);
    plugins.source(webpack);
    plugins.typescript(webpack, tsconfig);

    return webpack;
};


export default { config, entry, resolve };
export { config, entry, resolve };