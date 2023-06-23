import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            generator: {
                filename: 'assets/[contenthash][ext]'
            },
            test: /\.(eot|otf|ttf|woff|woff2)$/,
            type: 'asset/resource'
        }
    );
};