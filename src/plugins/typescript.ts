import { default as ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { default as TerserPlugin } from 'terser-webpack-plugin';
import { Configuration } from '~/types';
import path from '~/path';


const entry = (pattern: string | string[], { hash }: { hash?: boolean } = {}) => {
    return {
        filename: `[${hash ? 'contenthash' : 'name'}].js`,
        import: path.resolve(pattern)
    };
};


export default (webpack: Configuration, options: { transpileOnly?: boolean } = {}) => {
    webpack.module.rules.push(
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            options,
            resolve: {
                fullySpecified: false,
            }
        }
    );

    webpack.optimization.mangleWasmImports ||= webpack.mode === 'production';
    webpack.optimization.minimizer.push(
        new TerserPlugin({
            terserOptions: {
                format: {
                    comments: false,
                },
            },
            extractComments: false,
        })
    );
    webpack.optimization.usedExports ||= webpack.mode === 'production';

    webpack.plugins.push(
        new ForkTsCheckerWebpackPlugin()
    );

    webpack.resolve.extensions = ['.tsx', '.ts', '.js'];
    webpack.resolve.fullySpecified = false;
    webpack.resolve.plugins.push(
        new TsconfigPathsPlugin({
            extensions: webpack.resolve.extensions
        })
    );
};
export { entry };