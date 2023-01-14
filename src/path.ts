import glob from 'fast-glob';


const resolve = (pattern: string | string[]): string[] => {
    if (Array.isArray(pattern)) {
        let files = [];

        for (let i = 0, n = pattern.length; i < n; i++) {
            files.push( resolve(pattern[i]) );
        }

        return files.flat();
    }
    else if (!glob.isDynamicPattern(pattern)) {
        return [pattern];
    }

    return glob.sync(pattern);
};


export default { resolve };