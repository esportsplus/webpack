import { Configuration, NestedConfiguration } from '~/types';
import fs from 'node:fs';
import path from 'node:path';


function externals(internal: string[] = []): NestedConfiguration['externals'] {
    let externals: Record<string, string> = {},
        modules = read('node_modules');

    if (internal) {
        let directories: string[] = [];

        for (let directory of internal) {
            if (directory[0] !== '@' || directory.indexOf('/') !== -1) {
                continue;
            }

            directories.push(directory);
        }

        for (let i = 0, n = modules.length; i < n; i++) {
            let external = false,
                module = modules[i];

            for (let directory of directories) {
                if (module.startsWith(directory)) {
                    continue;
                }

                external = true;
                break;
            }

            if (external) {
                externals[modules[i]] = modules[i];
            }
        }
    }

    return externals;
}

function read(directory: string) {
    let list: string[] = [];

    try {
        let dependencies = fs.readdirSync(directory);

        for (let module of dependencies) {
            if (module[0] === '.') {
                continue;
            }

            if (module[0] === '@') {
                try {
                    let dependencies = fs.readdirSync( path.join(directory, module) );

                    for (let dependency of dependencies) {
                        list.push(`${module}/${dependency}`);
                    }

                    continue;
                }
                catch {}
            }

            list.push(module);
        }
    }
    catch {}

    return list;
}


export default (config: Configuration, packages: string[] = []) => {
    config.externals = externals(packages || []);
};