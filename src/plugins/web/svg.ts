import { ASSET_DIRECTORY } from '~/constants';
import { Configuration } from '~/types';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import path from 'node:path';


function loader(inline: boolean) {
    let plugins: any[] = [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        // viewBox is required to resize SVGs with CSS.
                        // @see https://github.com/svg/svgo/issues/1128
                        removeViewBox: false,
                    }
                }
            }
        ];

    if (inline) {
        plugins.push('removeXMLNS');
    }

    return {
        loader: ImageMinimizerPlugin.loader,
        options: {
            minimizer: {
                filename: `${ASSET_DIRECTORY}/[name].svg`,
                implementation: ImageMinimizerPlugin.svgoMinify,
                options: {
                    encodeOptions: {
                        // Pass over SVGs multiple times to ensure all optimizations are applied.
                        multipass: true,
                        // Built-in plugins enabled by default
                        // - see: https://github.com/svg/svgo#default-preset
                        plugins
                    }
                }
            }
        }
    };
}


export default (config: Configuration, { inline }: { inline?: string | string[] } = {}) => {
    let cwd = process.cwd(),
        directories: string[] = [];

    if (inline) {
        inline = Array.isArray(inline) ? inline : [inline];

        for (let i = 0, n = inline.length; i < n; i++) {
            directories.push( path.resolve(cwd, inline[i]) );
        }
    }

    config.module.rules.push(
        {
            exclude: directories,
            generator: {
                filename: `${ASSET_DIRECTORY}/[contenthash].svg`
            },
            test: /.svg$/,
            type: 'asset/resource',
            use: [ loader(false) ]
        },
        {
            include: directories,
            test: /.svg$/,
            type: 'asset/source',
            use: [ loader(true) ]
        }
    );
};