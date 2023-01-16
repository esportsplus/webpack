import { Configuration } from '~/types';
import path from 'node:path';


export default (webpack: Configuration, { inline }: { inline?: string | string[] } = {}) => {
    let paths = [];

    if (inline) {
        inline = Array.isArray(inline) ? inline : [inline];

        for (let i = 0, n = inline.length; i < n; i++) {
            paths.push( path.resolve(process.cwd(), inline[i]) );
        }
    }

    webpack.module.rules.push({
        generator: {
            filename: 'images/[contenthash][ext]'
        },
        exclude: paths,
        test: /.svg$/,
        type: 'asset/resource'
    });

    webpack.module.rules.push({
        include: paths,
        test: /.svg$/,
        type: 'asset/source',
    });
};