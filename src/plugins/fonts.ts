import { Configuration } from '~/types';


export default (webpack: Configuration) => {
    webpack.module.rules.push(
        {
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[contenthash][ext]'
            }
        }
    );
};