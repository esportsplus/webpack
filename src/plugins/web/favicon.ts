import { default as FaviconsWebpackPlugin,  } from 'favicons-webpack-plugin';
import { Configuration } from '~/types';


export default (config: Configuration, options: FaviconsWebpackPlugin['options']) => {
    options.prefix ??= 'assets/';

    config.plugins.push(
        new FaviconsWebpackPlugin(options)
    );
};