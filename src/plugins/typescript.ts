import { default as ForkTsCheckerWebpackPlugin } from 'fork-ts-checker-webpack-plugin';
import { default as TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { Configuration } from '~/types';
import resolve from '~/resolve';


const entry = (pattern: string | string[], { hash }: { hash?: boolean } = {}) => {
    return {
        filename: `[${hash ? 'contenthash' : 'name'}].js`,
        import: resolve.glob(pattern)
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