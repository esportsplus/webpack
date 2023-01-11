import { default as CopyWebpackPlugin } from 'copy-webpack-plugin';
import { Configuration } from '~/types';


export default (webpack: Configuration, patterns?: CopyWebpackPlugin.Pattern[]) => {
    if (!patterns) {
        return;
    }

    webpack.plugins.push(
        new CopyWebpackPlugin({
            options: {
                concurrency: 100
            },
            patterns
        })
    )
};