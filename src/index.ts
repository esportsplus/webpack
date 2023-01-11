import { WebpackConfiguration } from 'webpack-cli';
import { Configuration, Options } from './types';
import entry from './entry';
import plugins from './plugins';
import resolve from './resolve';


function normalize(webpack: WebpackConfiguration, { copy, html, production, server, tsconfig }: Options) {
    production = `${production}` !== 'false';

    webpack.mode = production ? 'production' : 'development';

    webpack.module = webpack.module || {};
    webpack.module.rules = webpack.module?.rules || [];

    webpack.optimization = webpack.optimization || {};
    webpack.optimization.minimize = production;

    webpack.output = webpack.output || {};
    webpack.output.path = resolve( webpack.output?.path || 'public' );

    webpack.plugins = webpack.plugins || [];

    webpack.resolve = webpack.resolve || {};
    webpack.resolve.plugins = webpack.resolve.plugins || [];

    tsconfig = resolve( tsconfig || 'tsconfig.json' );

    return { copy, html, server, tsconfig, webpack: webpack as Configuration };
}


const config = (base: WebpackConfiguration, options: Options) => {
    let { copy, html, server, tsconfig, webpack } = normalize(base, options);

    plugins.copy(webpack, copy);
    plugins.html(webpack, html);
    plugins.sass(webpack);
    plugins.server(webpack, server);
    plugins.typescript(webpack, tsconfig);

    return webpack;
};


export default { config, entry };
export { config, entry };