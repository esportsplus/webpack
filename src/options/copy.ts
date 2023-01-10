import { WebpackConfiguration } from 'webpack-cli';
import { default as CopyWebpackPlugin } from 'copy-webpack-plugin';


export default (config: WebpackConfiguration, patterns?: { from: string, to: string}[]) => {
    if (!patterns) {
        return;
    }

    config.plugins = config.plugins || [];
    config.plugins.push(
        new CopyWebpackPlugin({
            options: {
                concurrency: 100
            },
            patterns
        })
    )
};