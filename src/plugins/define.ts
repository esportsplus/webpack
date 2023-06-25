import { Configuration } from '~/types';
import webpack from 'webpack';


export default (config: Configuration, values: Record<PropertyKey, any> = {}) => {
    values['BUILD_RANDOM'] = (Math.random()*1e32).toString(36);
    values['BUILD_TARGET_NODE'] = config.target === 'node';
    values['BUILD_TARGET_WEB'] = config.target === 'web';

    config.plugins.push(
        new webpack.DefinePlugin(values)
    );
};