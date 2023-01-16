import { default as JsonMinimizerPlugin } from 'json-minimizer-webpack-plugin';
import { Configuration } from '~/types';


export default (webpack: Configuration) => {
    webpack.optimization.minimizer.push(
        new JsonMinimizerPlugin()
    );

    webpack.module.rules.push({
        generator: {
            filename: 'json/[contenthash][ext]'
        },
        test: /\.json$/,
        type: 'asset/resource'
    });
};