const { EsbuildPlugin } = require('esbuild-loader');

import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from '~/types';
import esbuild from 'esbuild';
import fs from 'node:fs';
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

    let dir = path.dirname( path.resolve(tsconfig) ),
        tsc = require( path.resolve(tsconfig) ),
        url = tsc?.compilerOptions?.baseURL;

    while (tsc?.extends && url === undefined) {
        let p;

        if (tsc.extends.indexOf('${configDir}') !== -1) {
            p = path.resolve( path.dirname(tsconfig), tsc.extends.split('${configDir}').pop() );
        }
        else if (tsc.extends.startsWith('.')) {
            p = path.resolve(dir, tsc.extends);
        }
        else {
            p = path.resolve(dir, 'node_modules', tsc.extends);

            if (!fs.existsSync(p)) {
                p = path.resolve(path.dirname( path.resolve(tsconfig) ), 'node_modules', tsc.extends);

                console.log({
                    path: p,
                    tsconfig: path.dirname( path.resolve(tsconfig) ),
                    extends: tsc.extends
                });
            }
        }

        dir = path.dirname(p);
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