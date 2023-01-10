import glob from 'glob';
import resolve from './resolve';


const entry = (pattern: string) => {
    return glob.sync(resolve(pattern), { nosort: true });
};

entry.sass = (pattern: string, { normalizer, ui }: { normalizer?: boolean, ui?: string } = {}) => {
    let files = entry(pattern);

    // TODO: Instead of build just glob?
    if (ui !== undefined) {
        files.push(`@esportsplus/ui/build/css/css-utilities${ui ? `.${ui}` : ''}.css`);
        files.unshift(`@esportsplus/ui/build/css/components${ui ? `.${ui}` : ''}.css`);
    }

    if (normalizer) {
        files.unshift('modern-normalize/modern-normalize.css');
    }

    return files;
};


export default entry;