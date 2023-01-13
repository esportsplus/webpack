import p from 'path';
import g from 'fast-glob';


const glob = (pattern: string | string[]) => {
    if (Array.isArray(pattern)) {
        pattern = `{${pattern.join(',')}}`;
    }
    else if (!g.isDynamicPattern(pattern)) {
        return pattern;
    }

    return g.sync(pattern);
};

const path = (pattern: string) => {
    return p.resolve(pattern).replace(/\\/g, '/');
};


export default { glob, path };
export { glob, path };