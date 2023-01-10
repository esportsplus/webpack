import { WebpackConfiguration } from 'webpack-cli';
import { copy, html, server } from './options';


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

type Options = {
    copy?: Parameters<typeof copy>[1];
    index?: Parameters<typeof html>[1];
    production?: boolean | string;
    server?: Parameters<typeof server>[1];
    tsconfig: string;
};


export { Configuration, Options };