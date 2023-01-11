import { default as ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from '~/types';


export default (config: Configuration, tsconfig: string) => {
    config.module.rules.push(
        {
            test: /\.(svg|txt)$/i,
            type: 'asset/source',
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            resolve: {
                fullySpecified: false,
            }
        }
    );

    config.optimization.mangleWasmImports = config.mode === 'production';
    config.optimization.usedExports = config.mode === 'production';

    config.plugins.push(
        new ForkTsCheckerWebpackPlugin()
    );

    config.resolve.extensions = ['.tsx', '.ts', '.js'];
    config.resolve.fullySpecified = false;
    config.resolve.plugins.push(
        new TsconfigPathsPlugin({
            configFile: tsconfig,
            extensions: config.resolve.extensions
        })
    );
};