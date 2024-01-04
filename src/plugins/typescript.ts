const { EsbuildPlugin } = require('esbuild-loader');

import { default as ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from '~/types';
import esbuild from 'esbuild';


export default async (config: Configuration, { tsconfig } = { tsconfig: './tsconfig.json'}) => {
    config.module.rules.push(
        {
            test: /\.tsx?$/,
            loader: 'esbuild-loader',
            options: {
                implementation: esbuild,
                target: 'esnext',
                tsconfig
            }
        }
    );

    config.optimization.minimizer.push(
        new EsbuildPlugin({
            css: true,
            target: 'esnext'
        })
    );

    config.plugins.push(
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: tsconfig
            }
        })
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