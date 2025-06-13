import { ASSET_DIRECTORY } from '~/constants';
import { Configuration } from '~/types';
// @ts-ignore
import svg from 'external-svg-sprite-loader';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            loader: svg.loader,
            options: {
                iconName: '[hash]',
                name: `${ASSET_DIRECTORY}/[contenthash].svg`
            },
            test: /\.svg$/,
        }
    );

    config.plugins.push(
        new svg({
            sprite: {
                startX: 4,
                startY: 4,
                deltaX: 4,
                deltaY: 4,
                iconHeight: 16,
                rowWidth: 1024
            },
        })
    );
};