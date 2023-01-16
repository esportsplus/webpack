import { Configuration } from '~/types';


export default (webpack: Configuration) => {
    webpack.module.rules.push({
        generator: {
            filename: 'images/[contenthash][ext]'
        },
        test: /.(gif|jpe?g|png)$/,
        type: 'asset/resource'
    });
};