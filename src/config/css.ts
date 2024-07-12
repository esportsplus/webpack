import { NestedConfiguration } from '~/types';
import config from './index';


export default (base: NestedConfiguration) => {
    base.target = 'web';

    let previous = base.use;

    base.use = (plugins) => {
        if (previous) {
            previous(plugins);
        }

        plugins.web.audio();
        plugins.web.fonts();
        plugins.web.images();
        plugins.web.sass();
        plugins.web.svg();
        plugins.web.txt();
        plugins.web.video();

        if (base.mode === 'production') {
            plugins.web.purgecss();
        }
    };

    return config(base);
};