import { Configuration } from '~/types';
import uuid from '@esportsplus/uuid';
import webpack from 'webpack';


export default (config: Configuration, values: Record<PropertyKey, any> = {}) => {
    values['BUILD_ID'] = uuid();
    values['BUILD_TARGET_NODE'] = config.target === 'node';
    values['BUILD_TARGET_WEB'] = config.target === 'web';

    config.plugins.push(
        new webpack.DefinePlugin(values)
    );
};