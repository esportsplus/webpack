import { Configuration } from '~/types';
import path from 'node:path';


export default (config: Configuration, { inline }: { inline?: string | string[] } = {}) => {
    let cwd = process.cwd(),
        paths = [];

    if (inline) {
        inline = Array.isArray(inline) ? inline : [inline];

        for (let i = 0, n = inline.length; i < n; i++) {
            paths.push( path.resolve(cwd, inline[i]) );
        }
    }

    config.module.rules.push(
        {
            exclude: paths,
            generator: {
                filename: 'images/[contenthash][ext]'
            },
            test: /.svg$/,
            type: 'asset/resource'
        },
        {
            include: paths,
            test: /.svg$/,
            type: 'asset/source',
        }
    );
};