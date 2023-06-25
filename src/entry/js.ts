import path from '~/path';


export default (pattern: string | string[]) => {
    return {
        filename: '[name].js',
        import: path.resolve(pattern)
    };
};