import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push({
        generator: {
            filename: 'files/[contenthash][ext]'
        },
        test: /\.txt$/,
        type: 'asset/resource',
    });
};