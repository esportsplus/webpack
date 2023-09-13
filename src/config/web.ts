import { NestedConfiguration } from '~/types';
import config from './index';


export default (base: NestedConfiguration) => {
    base.target = 'web';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.typescript();

        plugins.web.audio();
        plugins.web.fonts();
        plugins.web.images();
        plugins.web.json();
        plugins.web.sass();
        plugins.web.server();
        plugins.web.svg({
            inline: 'storage/svg'
        });
        plugins.web.txt();
        plugins.web.video();
    };

    return config(base);
};