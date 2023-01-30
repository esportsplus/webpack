import { CustomWebpackConfiguration, StrictWebpackConfiguration } from '~/types';
import fs from 'node:fs';
import parse from './parse';
import path from 'node:path';


let delimiter = '/',
    // Scoped module regex
    regex = new RegExp(
        '@[a-zA-Z0-9][\\w-.]+/[a-zA-Z0-9][\\w-.]+([a-zA-Z0-9./]+)?',
        'g'
    );


function externals(dependencies: string[]): CustomWebpackConfiguration['externals'] {
    if (!dependencies.length) {
        return [];
    }

    return [
        ({ request }, callback) => {
            let importing = request || '',
                name = importing.split(delimiter)[0];

            if (regex.test(importing)) {
                name = importing.split(delimiter, 2).join(delimiter);
                regex.lastIndex = 0;
            }

            // Mark module as external
            if (dependencies.indexOf(name) !== -1 && !dependencies.some((dependency) => dependency == importing)) {
                return callback(undefined, `commonjs ${importing}`);
            }

            callback();
        }
    ];
}


export default (base: StrictWebpackConfiguration, { exclude }: { exclude?: string[] }) => {
    // IMPORTANT!
    // - Bundling node apps with package.json dependencies until es module support improves
    let dependencies: string[] = [];

    try {
        let contents = JSON.parse(
                fs.readFileSync(path.resolve('package.json'), 'utf8') || '{}'
            );

        dependencies = Object.keys(contents?.dependencies || {}) || [];
    }
    catch {}

    base.externals = externals( dependencies.concat(exclude || []) );
    base.externalsPresets = { node: true };

    base.output = base.output || {};
    base.output.path = base.output?.path || 'build';

    base.target = 'node';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.typescript();
        return parse(base);
    };

};