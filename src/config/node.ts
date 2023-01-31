import { StrictWebpackConfiguration } from '~/types';
import config from './index';


// IMPORTANT!
// - Bundling node apps with package.json dependencies until es module support improves
export default (base: StrictWebpackConfiguration) => {
    base.externalsPresets = { node: true };

    // Disable all node polyfills
    base.node = false;

    base.output = base.output || {};
    base.output.path = base.output?.path || 'build';

    base.target = 'node';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.node.include();
        plugins.typescript();
    };

    return config(base);
};