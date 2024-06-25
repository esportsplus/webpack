const { EsbuildPlugin } = require('esbuild-loader');

import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from '~/types';
import esbuild from 'esbuild';
import path from 'node:path';


export default async (config: Configuration, { tsconfig } = { tsconfig: './tsconfig.json' }) => {
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

    let tsc = require( path.resolve(tsconfig) ),
        url = tsc?.compilerOptions?.baseURL;

    while (tsc?.extends && url === undefined) {
        tsc = require( path.resolve(tsc.extends) );
        url = tsc?.compilerOptions?.baseUrl;
    }

    if (url === undefined || url === '${configDir}') {
        url = './';
    }
    else if (url.startsWith('${configDir}')) {
        url = url.replace('${configDir}', '.');
    }

    config.resolve.extensions = ['.tsx', '.ts', '.js'];
    config.resolve.fullySpecified = false;
    config.resolve.plugins.push(
        new TsconfigPathsPlugin({
            baseUrl: url,
            configFile: tsconfig,
            extensions: config.resolve.extensions
        })
    );
};