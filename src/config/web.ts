import { StrictWebpackConfiguration } from '~/types';
import config from './index';


export default (base: StrictWebpackConfiguration) => {
    base.output ??= {};
    base.output.path ??= 'public';

    base.target = 'web';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.typescript();

        plugins.web.fonts();
        plugins.web.images();
        plugins.web.json();
        plugins.web.sass();
        plugins.web.server();
        plugins.web.svg({
            inline: 'storage/svg'
        });
        plugins.web.txt();
    };

    return config(base);
};