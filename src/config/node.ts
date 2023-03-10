import { StrictWebpackConfiguration } from '~/types';
import config from './index';


export default (base: StrictWebpackConfiguration) => {
    base.externalsPresets ??= {};
    base.externalsPresets.node ??= true;

    // Disables all node polyfills
    base.node = false;

    base.output ??= {};
    base.output.path ??= 'build';

    base.target = 'node';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        // If plugin has not been set all
        // node_module packages will be marked as external
        plugins.node.include();
        plugins.typescript();
    };

    return config(base);
};