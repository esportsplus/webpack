import { WebpackConfiguration } from 'webpack-dev-server';
import { Configuration, Options } from './types';
import glob from 'glob';
import path from 'path';
import options from './options';
import rules from './rules';


function resolve(pattern: string) {
    return path.resolve(pattern).replace(/\\/g, '/');
}


const entry = (pattern: string) => {
    return glob.sync(resolve(pattern), { nosort: true });
};

entry.sass = (pattern: string, { normalizer, ui }: { normalizer?: boolean, ui?: string } = {}) => {
    let files = entry(pattern);

    // TODO: Instead of build just glob?
    if (ui !== undefined) {
        files.push(`@esportsplus/ui/build/css/css-utilities${ui ? `.${ui}` : ''}.css`);
        files.unshift(`@esportsplus/ui/build/css/components${ui ? `.${ui}` : ''}.css`);
    }

    if (normalizer) {
        files.unshift('modern-normalize/modern-normalize.css');
    }

    return files;
};


export default (config: WebpackConfiguration, { copy, index, production, server, tsconfig }: Options) => {
    config.mode = (`${production}` !== 'false') ? 'production' : 'development';

    config.module = config.module || {};
    config.module.rules = config.module?.rules || [];

    config.optimization = config.optimization || {};
    config.optimization.minimize = config.mode === 'production';

    config.output = config.output || {};
    config.output.filename = config.output.filename || '[contenthash][ext]';
    config.output.path = config.output.path ? path.resolve(config.output.path) : undefined;

    config.plugins = config.plugins || [];

    config.resolve = config.resolve || {};
    config.resolve.plugins = config.resolve.plugins || [];

    options.copy(config as Configuration, copy);
    options.html(config as Configuration, index);
    options.server(config as Configuration, server);

    rules.sass(config as Configuration);
    rules.typescript(config as Configuration, resolve(tsconfig));

    return config;
};
export { entry };