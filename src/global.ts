declare module '*.jpg';
declare module '*.json';
declare module '*.png';
declare module '*.svg';
declare module '*.txt';
declare module '*.webm';
declare module '*.webp';


type Prettify<T> = {
    [K in keyof T]: T[K];
} & {};