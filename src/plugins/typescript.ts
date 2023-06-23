import { default as ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { default as TerserPlugin } from 'terser-webpack-plugin';
import { Configuration } from '~/types';
import path from '~/path';
import nodepath from 'node:path';


const entry = (pattern: string | string[], { hash }: { hash?: boolean } = {}) => {
    return {
        filename: `[${hash ? 'contenthash' : 'name'}].js`,
        import: path.resolve(pattern)
    };
};


export default (config: Configuration, options: { configFile?: string, transpileOnly?: boolean } = {}) => {
    options.configFile ??= nodepath.resolve('./tsconfig.json');

    config.module.rules.push(
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            options,
            resolve: {
                fullySpecified: false
            }
        }
    );

    config.optimization.mangleWasmImports ??= config.mode === 'production';
    config.optimization.minimizer.push(
        new TerserPlugin({
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: false,
        })
    );
    config.optimization.usedExports ??= config.mode === 'production';

    config.plugins.push(
        new ForkTsCheckerWebpackPlugin()
    );

    config.resolve.extensions = ['.tsx', '.ts', '.js'];
    config.resolve.fullySpecified = false;
    config.resolve.plugins.push(
        new TsconfigPathsPlugin({
            extensions: config.resolve.extensions
        })
    );
};
export { entry };