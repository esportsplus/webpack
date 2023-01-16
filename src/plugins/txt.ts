import { Configuration } from '~/types';


export default (webpack: Configuration) => {
    webpack.module.rules.push(
        {
            test: /\.txt$/,
            type: 'asset/source',
        }
    );
};