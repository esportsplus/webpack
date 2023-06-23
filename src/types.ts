import { WebpackConfiguration } from "webpack-cli";
import { default as p } from './plugins';


type Configuration = {
    module: {
        rules: NonNullable< NonNullable<WebpackConfiguration['module']>['rules'] >
    };
    optimization: NonNullable<WebpackConfiguration['optimization']> & {
        minimizer: NonNullable< NonNullable< WebpackConfiguration['optimization'] >['minimizer'] >
    };
    output: NonNullable< WebpackConfiguration['output'] >;
    plugins: NonNullable< WebpackConfiguration['plugins'] >;
    resolve: NonNullable<WebpackConfiguration['resolve']> & {
        fallback: {
            [index: string]: string | false | string[];
        },
        plugins: NonNullable< NonNullable<WebpackConfiguration['resolve']>['plugins'] >
    };
} & WebpackConfiguration;

type NestedConfiguration = {
    entry: NestedEntry | WebpackConfiguration['entry'],
    mode: NonNullable< WebpackConfiguration['mode'] >,
    use?: (plugins: ReturnType<typeof p>) => void;
} & Omit<WebpackConfiguration, 'entry'>;

interface NestedEntry {
    [key: string]: NestedEntry | WebpackConfiguration['entry']
};


export { Configuration, NestedConfiguration };