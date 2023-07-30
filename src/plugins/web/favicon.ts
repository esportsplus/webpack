import { default as FaviconsWebpackPlugin } from 'favicons-webpack-plugin';
import { Configuration } from '~/types';


type Options = FaviconsWebpackPlugin['options'];


export default (config: Configuration, options: Partial<Options>) => {
    options.prefix ??= 'assets/';

    config.plugins.push(
        new FaviconsWebpackPlugin(options as Options)
    );
};