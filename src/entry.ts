import glob from 'fast-glob';
import resolve from './resolve';


type Options = {
    directory: string;
    extension: string;
    hash?: boolean;
};


function entry(pattern: string, { directory, extension, hash }: Options) {
    return {
        filename: `${directory}/[${hash ? 'contenthash' : 'name'}].${extension}`,
        import: glob.sync( resolve(pattern) )
    };;
}


const js = (pattern: string, { directory, hash }: Partial<Omit<Options, 'extension'>>) => {
    return entry(pattern, {
        directory: directory || 'js',
        extension: 'js',
        hash
    });
};

const sass = (pattern: string, { directory, hash }: Partial<Omit<Options, 'extension'>>) => {
    return entry(pattern, {
        directory: directory || 'css',
        extension: 'css',
        hash
    });
};


export default { js, sass };