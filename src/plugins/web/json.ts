import { ASSET_DIRECTORY } from '~/constants';
import { default as JsonMinimizerPlugin } from 'json-minimizer-webpack-plugin';
import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            generator: {
                filename: `${ASSET_DIRECTORY}/[contenthash][ext]`
            },
            test: /\.json$/,
            type: 'asset/resource'
        }
    );

    config.optimization.minimizer.push(
        new JsonMinimizerPlugin()
    );
};