export default (production?: boolean | string) => {
    return (`${production}` !== 'false') ? 'production' : 'development';
};