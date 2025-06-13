import { ASSET_DIRECTORY } from '~/constants';
import { Configuration } from '~/types';


export default (config: Configuration) => {
    // @ts-ignore
    let pkg = import('external-svg-sprite-loader');

    config.module.rules.push(
        {
            // @ts-ignore
            loader: pkg.loader,
            options: {
                iconName: '[hash]',
                name: `${ASSET_DIRECTORY}/[contenthash].svg`
            },
            test: /\.svg$/,
        }
    );

    config.plugins.push(
        // @ts-ignore
        new pkg({
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