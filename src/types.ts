import { EntryObject } from 'webpack';
import { WebpackConfiguration } from 'webpack-cli';
import { default as p } from './plugins';


type Configuration = {
    module: {
        rules: NonNullable< NonNullable<WebpackConfiguration['module']>['rules'] >
    };
    optimization: NonNullable< WebpackConfiguration['optimization'] >;
    output: NonNullable< WebpackConfiguration['output'] >;
    plugins: NonNullable< WebpackConfiguration['plugins'] >;
    resolve: {
        plugins: NonNullable< NonNullable<WebpackConfiguration['resolve']>['plugins'] >
    };
} & WebpackConfiguration;

type CustomWebpackConfiguration = {
    entry: NestedEntry | WebpackConfiguration['entry'],
    use?: (plugins: ReturnType<typeof p>) => void;
} & Omit<WebpackConfiguration, 'entry'>;

interface NestedEntry {
    [key: string]: NestedEntry | WebpackConfiguration['entry']
};


export { Configuration, CustomWebpackConfiguration, EntryObject, NestedEntry, WebpackConfiguration };