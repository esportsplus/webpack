import { Configuration } from '~/types';
import path from 'node:path';


export default (webpack: Configuration, options: { inline?: string | string[] } = {}) => {
    let { inline } = options,
        paths = [];

    if (inline) {
        inline = Array.isArray(inline) ? inline : [inline];

        for (let i = 0, n = inline.length; i < n; i++) {
            paths.push( path.resolve(process.cwd(), inline[i]) );
        }
    }

    webpack.module.rules.push(
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