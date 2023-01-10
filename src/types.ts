import options from './options';


type Options = {
    copy?: Parameters<typeof options.copy>[1];
    index?: Parameters<typeof options.html>[1];
    production?: boolean | string;
    server?: Parameters<typeof options.server>[1];
};


export { Options };