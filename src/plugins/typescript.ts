import { EsbuildPlugin } from 'esbuild-loader';
import { default as TsconfigPathsPlugin } from '@esportsplus/tsconfig-paths-webpack-plugin';
import { Configuration } from '~/types';
import esbuild from 'esbuild';


let extensions = ['.tsx', '.ts', '.js'];


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


    config.resolve.extensions ??= [];
    config.resolve.extensions.push(...extensions)

    config.resolve.fullySpecified = false;
    config.resolve.plugins.push(
        new TsconfigPathsPlugin({
            configFile: tsconfig,
            extensions
        })
    );
};