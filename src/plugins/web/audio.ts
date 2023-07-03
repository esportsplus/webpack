import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            generator: {
                filename: 'assets/[contenthash][ext]'
            },
            test: /\.mp3$/,
            type: 'asset/resource'
        }
    );
};