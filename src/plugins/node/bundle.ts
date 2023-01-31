import { Configuration, CustomWebpackConfiguration } from '~/types';
import fs from 'node:fs';
import path from 'node:path';


let delimiter = '/',
    regex = {
        at: new RegExp('^@', 'g'),
        scoped: new RegExp(
            '@[a-zA-Z0-9][\\w-.]+/[a-zA-Z0-9][\\w-.]+([a-zA-Z0-9./]+)?',
            'g'
        )
    };


function read(directory: string) {
    let list: string | string[] = [];

    if (!fs.existsSync(directory)) {
        return list;
    }

    try {
        list = fs
            .readdirSync(directory)
            .map((module) => {
                if (regex.at.test(module)) {
                    regex.at.lastIndex = 0;

                    try {
                        return fs
                            .readdirSync(path.join(directory, module))
                            .map((scoped) => `${module}/${scoped}`);
                    }
                    catch {
                        return [ module ];
                    }
                }

                return module;
            })
            .reduce(function (prev, next) {
                return prev.concat(Array.isArray(next) ? next[0] : next);
            }, []);
    }
    catch {}

    return typeof list === 'string' ? [list] : list;
};


const externals = (ignore: string[] = []): CustomWebpackConfiguration['externals'] => {
    let packages = read('node_modules');

    if (ignore) {
        packages = packages.filter((name: string) => {
            return ignore.indexOf(name) === -1;
        });
    }

    if (!packages.length) {
        return [];
    }

    return [
        ({ request }, callback) => {
            let importing = request || '',
                name = importing.split(delimiter)[0];

            if (regex.scoped.test(importing)) {
                name = importing.split(delimiter, 2).join(delimiter);
                regex.scoped.lastIndex = 0;
            }

            // Mark module as external
            if (packages.indexOf(name) !== -1) {
                return callback(undefined, `commonjs ${importing}`);
            }

            callback();
        }
    ];
};


export default (webpack: Configuration, include: string[] = []) => {
    webpack.externals = externals(include || []);
};
export { externals };