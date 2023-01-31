import { Configuration, CustomWebpackConfiguration } from '~/types';
import fs from 'node:fs';
import path from 'node:path';


let delimiter = '/',
    // Scoped module regex
    regex = new RegExp(
        '@[a-zA-Z0-9][\\w-.]+/[a-zA-Z0-9][\\w-.]+([a-zA-Z0-9./]+)?',
        'g'
    );


function externals(internal: string[] = []): CustomWebpackConfiguration['externals'] {
    let externals = read('node_modules');

    if (internal) {
        let directories: string[] = [];

        for (let directory of internal) {
            if (directory[0] !== '@' || directory.indexOf(delimiter) !== -1) {
                continue;
            }

            directories.push(directory);
        }

        externals = externals.filter((name: string) => {
            for (let directory of directories) {
                if (name.startsWith(directory)) {
                    return false;
                }
            }

            return internal.indexOf(name) === -1;
        });
    }

    if (!externals.length) {
        return [];
    }

    return [
        ({ request }, callback) => {
            if (request) {
                let name = request.split(delimiter)[0];

                if (regex.test(request)) {
                    name = request.split(delimiter, 2).join(delimiter);
                    regex.lastIndex = 0;
                }

                // Mark module as external
                if (externals.indexOf(name) !== -1) {
                    return callback(undefined, `commonjs ${request}`);
                }
            }

            callback();
        }
    ];
}

function read(directory: string) {
    let list: string[] = [];

    try {
        let dependencies = fs.readdirSync(directory);

        for (let module of dependencies) {
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


export default (webpack: Configuration, packages: string[] = []) => {
    webpack.externals = externals(packages || []);
};