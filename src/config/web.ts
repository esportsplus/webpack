// import { ASSET_DIRECTORY } from '~/constants';
import { NestedConfiguration } from '~/types';
import config from './index';


export default (base: NestedConfiguration) => {
    base.target = 'web';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.define();
        plugins.typescript();

        plugins.web.audio();
        plugins.web.fonts();
        plugins.web.images();
        plugins.web.json();
        plugins.web.polyfill.node();
        plugins.web.sass();
        plugins.web.server();
        plugins.web.svg({
            inline: 'storage/svg'
        });
        plugins.web.txt();
        plugins.web.video();
    };

    let c = config(base);

    // TODO: Better splitchunk per route etc.
    // c.optimization.splitChunks = c.optimization.splitChunks || {};
    // c.optimization.splitChunks.cacheGroups = c.optimization.splitChunks.cacheGroups || {};
    // c.optimization.splitChunks.cacheGroups.vendor = {
    //     chunks: 'all',
    //     filename: `${ASSET_DIRECTORY}/[contenthash].js`,
    //     reuseExistingChunk: true,
    //     test: /node_modules/
    // };

    return c;
};