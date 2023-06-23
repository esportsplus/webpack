import { Configuration } from '~/types';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import path from 'node:path';


export default (config: Configuration, { inline }: { inline?: string | string[] } = {}) => {
    let cwd = process.cwd(),
        paths = [];

    if (inline) {
        inline = Array.isArray(inline) ? inline : [inline];

        for (let i = 0, n = inline.length; i < n; i++) {
            paths.push( path.resolve(cwd, inline[i]) );
        }
    }

    config.module.rules.push(
        {
            exclude: paths,
            generator: {
                filename: 'assets/[contenthash][ext]'
            },
            test: /.svg$/,
            type: 'asset/resource'
        },
        {
            include: paths,
            test: /.svg$/,
            type: 'asset/source',
        }
    );

    config.optimization.minimizer.push(
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.svgoMinify,
                options: {
                    encodeOptions: {
                        // Pass over SVGs multiple times to ensure all optimizations are applied.
                        multipass: true,
                        // Built-in plugins enabled by default
                        // - see: https://github.com/svg/svgo#default-preset
                        plugins: [
                            "preset-default",
                        ],
                        removeViewBox: false
                    },
                },
            },
        })
    );
};