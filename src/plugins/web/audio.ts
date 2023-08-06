import { ASSET_DIRECTORY } from '~/constants';
import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            generator: {
                filename: `${ASSET_DIRECTORY}/[contenthash][ext]`
            },
            test: /\.mp3$/,
            type: 'asset/resource'
        }
    );
};