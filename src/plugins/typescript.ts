const { EsbuildPlugin } = require('esbuild-loader');

import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from '~/types';
import { dirname, resolve } from 'node:path';
import esbuild from 'esbuild';
import fs from 'node:fs';


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

    let dir = dirname( resolve(tsconfig) ),
        tsc = require( resolve(tsconfig) ),
        url = tsc?.compilerOptions?.baseURL;

    while (tsc?.extends && url === undefined) {
        let p;

        if (tsc.extends.indexOf('${configDir}') !== -1) {
            p = resolve(dirname(tsconfig), tsc.extends.split('${configDir}').pop());
        }
        else if (tsc.extends.startsWith('.')) {
            p = resolve(dir, tsc.extends);
        }
        else {
            p = resolve(dir, 'node_modules', tsc.extends);

            if (!fs.existsSync(p)) {
                p = resolve(dirname( resolve(tsconfig) ), 'node_modules', tsc.extends);
            }
        }

        dir = dirname(p);
        tsc = require(p);
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