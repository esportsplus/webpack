import { NestedConfiguration } from '~/types';
import config from './index';


export default (base: NestedConfiguration) => {
    // Disables all node polyfills
    base.node ??= {};

    if (base.node) {
        base.node.global = false;
    }

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
    };

    return config(base);
};