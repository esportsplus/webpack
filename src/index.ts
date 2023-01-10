import { WebpackConfiguration } from 'webpack-dev-server';
import { Options } from './types';
import configuration from './configuration';
import entry from './entry';
import options from './options';
import resolve from './resolve';
import rules from './rules';


export default (webpack: WebpackConfiguration, { copy, index, production, server, tsconfig }: Options) => {
    let config = configuration(webpack, production);

    options.copy(config, copy);
    options.html(config, index);
    options.server(config, server);

    rules.sass(config);
    rules.typescript(config, resolve(tsconfig));

    return config;
};
export { entry };