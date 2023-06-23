import { default as FaviconsWebpackPlugin } from 'favicons-webpack-plugin';
import { Configuration } from '~/types';


export default (config: Configuration, options: { manifest?: string, prefix?: string, svg: string }) => {
    config.plugins.push(
        new FaviconsWebpackPlugin({
            logo: options.svg,
            manifest: options?.manifest,
            prefix: options?.prefix || './'
        })
    );
};