import path from '~/path';


// DO NOT ADD EXTENSION TO 'filename'
// - All files will receive the extension ( including bundled js files )
// - `mini-css-extract-plugin` plugin appends css extension once extracted
// - JS files created during bundle are left extensionless
// - Makes it easy to cleanup empty js files after build
export default (pattern: string | string[]) => {
    return {
        filename: '[name]',
        import: path.resolve(pattern)
    };
};