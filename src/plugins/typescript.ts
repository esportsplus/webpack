const { EsbuildPlugin } = require('esbuild-loader');

import { default as ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from '~/types';
import esbuild from 'esbuild';
import path from 'node:path';


export default async (config: Configuration, { tsconfig }: { tsconfig?: string } = {}) => {
    tsconfig ??= path.resolve('./tsconfig.json');

    config.module.rules.push(
        {
            test: /\.[jt]sx?$/,
            loader: 'esbuild-loader',
            options: {
                implementation: esbuild,
                target: 'esnext',
                tsconfig
            }
        }
    );

    config.optimization.mangleWasmImports ??= config.mode === 'production';
    config.optimization.minimizer.push(
        new EsbuildPlugin({
            css: true
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
            configFile: tsconfig,
            extensions: config.resolve.extensions
        })
    );
};