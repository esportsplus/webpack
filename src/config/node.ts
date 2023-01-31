import { StrictWebpackConfiguration } from '~/types';
import fs from 'node:fs';
import path from 'node:path';
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

        // Bundles 'devDependencies' if imported within node application
        if (!base.externals) {
            let internal: string[] = [];

            try {
                let contents = JSON.parse(
                        fs.readFileSync(path.resolve('package.json'), 'utf8') || '{}'
                    );

                internal = Object.keys(contents?.devDependencies || {}) || [];
            }
            catch {}

            plugins.node.bundle(internal);
        }

        plugins.typescript();
    };

    return config(base);
};