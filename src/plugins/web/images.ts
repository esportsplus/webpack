import { Configuration } from '~/types';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            test: /\.(jpe?g|png|gif|webp)$/,
            loader: ImageMinimizerPlugin.loader,
            enforce: 'pre',
            options: {
                generator: [
                    {
                        filename: 'assets/[contenthash][ext]',
                        implementation: ImageMinimizerPlugin.sharpGenerate,
                        options: {
                            encodeOptions: {
                                // https://sharp.pixelplumbing.com/api-output#avif
                                avif: {
                                    lossless: true,
                                },
                                // https://sharp.pixelplumbing.com/api-output#jpeg
                                jpeg: {
                                    quality: 100,
                                },
                                // gif does not support lossless compression at all
                                // https://sharp.pixelplumbing.com/api-output#gif
                                gif: {},
                                // png by default sets the quality to 100%, which is same as lossless
                                // https://sharp.pixelplumbing.com/api-output#png
                                png: {},
                                // https://sharp.pixelplumbing.com/api-output#webp
                                webp: {
                                    lossless: true,
                                }
                            },
                            plugins: ['sharp-webp']
                        }
                    }
                ]
            },
        },
    );
};