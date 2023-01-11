import { default as ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from '~/types';
import glob from 'fast-glob';
import resolve from '~/resolve';


const entry = (pattern: string, { directory, hash }: { directory?: string, hash?: boolean } = {}) => {
    if (directory === undefined) {
        directory = `js`;
    }

    return {
        filename: `${directory ? `${directory}/` : ''}[${hash ? 'contenthash' : 'name'}].js`,
        import: glob.sync( resolve(pattern) )
    };
};


export default (webpack: Configuration, tsconfig: string) => {
    webpack.module.rules.push(
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
            resolve: {
                fullySpecified: false,
            }
        }
    );

    webpack.optimization.mangleWasmImports = webpack.mode === 'production';
    webpack.optimization.usedExports = webpack.mode === 'production';

    webpack.plugins.push(
        new ForkTsCheckerWebpackPlugin()
    );

    webpack.resolve.extensions = ['.tsx', '.ts', '.js'];
    webpack.resolve.fullySpecified = false;
    webpack.resolve.plugins.push(
        new TsconfigPathsPlugin({
            configFile: tsconfig,
            extensions: webpack.resolve.extensions
        })
    );
};
export { entry };