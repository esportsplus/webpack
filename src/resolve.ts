import path from 'path';


export default (pattern: string) => {
    return path.resolve(pattern).replace(/\\/g, '/');
};