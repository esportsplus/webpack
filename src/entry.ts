import glob from 'fast-glob';
import resolve from './resolve';


const js = (pattern: string, { hash }: { hash?: boolean }) => {
    let files = glob.sync( resolve(pattern) );

    if (hash) {
        return {
            filename: 'js/[contenthash].js',
            import: files
        };
    }

    return files;
};

const sass = (pattern: string, { normalizer, ui }: { normalizer?: boolean, ui?: string } = {}) => {
    let files = glob.sync( resolve(pattern) );

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


export default { js, sass };