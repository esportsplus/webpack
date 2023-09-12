import { ASSET_DIRECTORY } from '~/constants';
import { Configuration } from '~/types';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import path from 'node:path';


export default (config: Configuration, { spritemap }: { spritemap?: string | string[] } = {}) => {
    let cwd = process.cwd(),
        directories: string[] = [];

    if (spritemap) {
        spritemap = Array.isArray(spritemap) ? spritemap : [spritemap];

        for (let i = 0, n = spritemap.length; i < n; i++) {
            directories.push( path.resolve(cwd, spritemap[i]) );
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
            use: [
                {
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
                                    plugins: [
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
                                    ]
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            include: directories,
            test: /.svg$/,
            use: [
                {
                    loader: 'svg-sprite-loader',
                    options: {
                        outputPath: `${ASSET_DIRECTORY}/`
                    }
                }
            ]
        }
    );
};