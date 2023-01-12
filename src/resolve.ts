import p from 'path';
import g from 'fast-glob';


const glob = (pattern: string) => {
    return g.sync( path(pattern) );
};

const path = (pattern: string) => {
    return p.resolve(pattern).replace(/\\/g, '/');
};


export default { glob, path };
export { glob, path };