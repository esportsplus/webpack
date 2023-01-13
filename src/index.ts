import { Configuration, WebpackConfiguration } from './types';
import entry from './entry';
import plugins from './plugins';
import resolve from './resolve';


function defaults(webpack: WebpackConfiguration) {
    webpack.mode = 'production';

    webpack.module = webpack.module || {};
    webpack.module.rules = webpack.module?.rules || [];

    webpack.optimization = webpack.optimization || {};
    webpack.optimization.minimize = webpack.mode === 'production';

    webpack.output = webpack.output || {};
    webpack.output.path = resolve.path( webpack.output?.path || 'public' );

    webpack.plugins = webpack.plugins || [];

    webpack.resolve = webpack.resolve || {};
    webpack.resolve.plugins = webpack.resolve.plugins || [];

    return webpack as Configuration;
}


const config = (fn: (webpack: WebpackConfiguration, options: ReturnType<typeof plugins>) => WebpackConfiguration) => {
    let webpack = defaults({});

    fn(webpack, plugins(webpack));

    return webpack;
};


export default { config, entry, resolve };
export { config, entry, resolve };