import { ASSET_DIRECTORY } from '~/constants';
import { default as FaviconsWebpackPlugin } from 'favicons-webpack-plugin';
import { Configuration } from '~/types';


type Options = Exclude<ConstructorParameters<typeof FaviconsWebpackPlugin>[0], string>;


export default (config: Configuration, options: Partial<Options>) => {
    options.prefix ??= `${ASSET_DIRECTORY}/`;

    config.plugins.push(
        new FaviconsWebpackPlugin(options as Options)
    );
};