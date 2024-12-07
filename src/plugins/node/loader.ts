import { Configuration } from '~/types';


export default (config: Configuration) => {
    config.module.rules.push(
        {
            test: /\.node$/,
            loader: "node-loader",
          }
    );

    config.resolve.extensions ??= [];
    config.resolve.extensions.push('.node');
};