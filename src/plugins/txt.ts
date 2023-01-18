import { Configuration } from '~/types';


export default (webpack: Configuration) => {
    webpack.module.rules.push({
        generator: {
            filename: 'files/[contenthash][ext]'
        },
        test: /\.txt$/,
        type: 'asset/resource',
    });
};