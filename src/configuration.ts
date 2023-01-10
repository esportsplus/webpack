import { WebpackConfiguration } from 'webpack-dev-server';
import { Configuration, Options } from './types';
import path from 'path';


export default (data: WebpackConfiguration, production: Options['production']): Configuration => {
    data.mode = (`${production}` !== 'false') ? 'production' : 'development';

    data.module = data.module || {};
    data.module.rules = data.module?.rules || [];

    data.optimization = data.optimization || {};
    data.optimization.minimize = data.mode === 'production';

    data.output = data.output || {};
    data.output.filename = data.output.filename || '[contenthash][ext]';
    data.output.path = data.output.path ? path.resolve(data.output.path) : undefined;

    data.plugins = data.plugins || [];

    data.resolve = data.resolve || {};
    data.resolve.plugins = data.resolve.plugins || [];

    return data as Configuration;
};