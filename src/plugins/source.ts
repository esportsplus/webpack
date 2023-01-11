import { Configuration } from '~/types';


export default (webpack: Configuration) => {
    webpack.module.rules.push(
        {
            test: /\.(svg|txt)$/i,
            type: 'asset/source',
        }
    );
};