import { default as CopyWebpackPlugin } from 'copy-webpack-plugin';
import { Configuration } from '~/types';


export default (config: Configuration, patterns?: CopyWebpackPlugin.Pattern[]) => {
    if (!patterns) {
        return;
    }

    config.plugins.push(
        new CopyWebpackPlugin({
            options: {
                concurrency: 100
            },
            patterns
        })
    )
};