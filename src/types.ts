import { WebpackConfiguration } from 'webpack-cli';
import { copy, favicon, html, server } from './plugins';


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
    favicon?: Parameters<typeof favicon>[1];
    html?: Parameters<typeof html>[1];
    production?: boolean | string;
    server?: Parameters<typeof server>[1];
    tsconfig?: string;
};


export { Configuration, Options };