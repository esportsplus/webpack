import { Configuration } from '~/types';


export default (webpack: Configuration, production: boolean | string) => {
    webpack.mode = (`${production}` !== 'false') ? 'production' : 'development';
};