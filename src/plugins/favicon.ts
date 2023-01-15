import { default as FaviconsWebpackPlugin } from 'favicons-webpack-plugin';
import { Configuration } from '~/types';


export default (webpack: Configuration, options: { manifest?: string, prefix?: string, svg: string }) => {
    webpack.plugins.push(
        new FaviconsWebpackPlugin({
            logo: options.svg,
            manifest: options?.manifest,
            prefix: options?.prefix || '/'
        })
    );
};