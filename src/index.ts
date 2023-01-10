import { WebpackConfiguration } from 'webpack-cli';
import { Options } from './types';
import glob from 'glob';
import path from 'path';
import options from './options';
import rules from './rules';


const entry = (pattern: string) => {
    return glob.sync(path.resolve(pattern), { nosort: true });
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


export default (config: WebpackConfiguration, { copy, index, production, server }: Options = {}) => {
    config.mode = (`${production}` !== 'false') ? 'production' : 'development';

    config.optimization = config.optimization || {};
    config.optimization.minimize = config.mode === 'production';

    config.output = config.output || {};
    config.output.filename = config.output.filename || '[contenthash][ext]';
    config.output.path = config.output.path ? path.resolve(config.output.path) : undefined;

    options.copy(config, copy);
    options.html(config, index);
    options.server(config, server);

    rules.sass(config);
    rules.typescript(config);

    return config;
};
export { entry };