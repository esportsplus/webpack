import entry from './entry';
import config from './config';
import resolve from './resolve';


const mode = (production?: boolean | string) => {
    return (`${production}` !== 'false') ? 'production' : 'development';
};


export default { config, entry, mode, resolve };
export { config, entry, mode, resolve };