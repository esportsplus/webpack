import { ASSET_DIRECTORY } from '~/constants';
import { Configuration } from '~/types';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            generator: {
                filename: `${ASSET_DIRECTORY}/[contenthash].webp`
            },
            test: /\.(gif|jpe?g|png|webp)$/,
            type: 'asset/resource'
        }
    );

    config.optimization.minimizer.push(
        new ImageMinimizerPlugin({
            exclude: /(android-|apple-|favicon-|mstile-|yandex-)/,
            generator: [
                {
                    filename: '[path][name].webp',
                    implementation: ImageMinimizerPlugin.sharpGenerate,
                    options: {
                        encodeOptions: {
                            // https://sharp.pixelplumbing.com/api-output#webp
                            webp: {
                                quality: 90
                            }
                        }
                    },
                    type: 'asset'
                }
            ],
            test: /\.(gif|jpe?g|png|webp)$/
        })
    );
};