import { default as JsonMinimizerPlugin } from 'json-minimizer-webpack-plugin';
import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            generator: {
                filename: 'assets/[contenthash].json'
            },
            test: /\.json$/,
            type: 'asset/resource'
        }
    );

    config.optimization.minimizer.push(
        new JsonMinimizerPlugin()
    );
};