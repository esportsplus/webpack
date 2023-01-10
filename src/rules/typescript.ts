import { default as ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
import { WebpackConfiguration } from 'webpack-cli';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';


export default (config: WebpackConfiguration) => {
    config.module = config.module || {};
    config.module.rules = config.module?.rules || [];
    config.module.rules.push(
        {
            generator: {
                dataUrl: (content: any) => {
                    return content.toString();
                }
            },
            test: /\.(svg)$/i,
            type: 'asset/inline',
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            resolve: {
                fullySpecified: false,
            }
        },
        {
            test: /\.txt$/i,
            use: 'raw-loader',
        }
    );

    config.optimization = config.optimization || {};
    config.optimization.mangleWasmImports = config.mode === 'production';
    config.optimization.usedExports = config.mode === 'production';

    config.plugins = config.plugins || [];
    config.plugins.push(
        new ForkTsCheckerWebpackPlugin()
    );

    config.resolve = config.resolve || {};
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(
        new TsconfigPathsPlugin()
    );
};