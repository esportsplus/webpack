import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            generator: {
                filename: 'assets/[contenthash][ext]'
            },
            test: /\.txt$/,
            type: 'asset/resource',
        }
    );
};