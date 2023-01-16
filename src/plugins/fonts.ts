import { Configuration } from '~/types';


export default (webpack: Configuration) => {
    webpack.module.rules.push(
        {
            generator: {
                filename: 'fonts/[contenthash][ext]'
            },
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            type: 'asset/resource'
        }
    );
};