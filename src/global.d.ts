declare module '*.jpg';
declare module '*.json';
declare module '*.mp3';
declare module '*.mp4';
declare module '*.pdf';
declare module '*.png';
declare module '*.svg' {
    const content: {
        symbol: string;
        title: string;
        view: string;
        viewBox: string;
    };

    export default content;
};
declare module '*.txt';
declare module '*.webm';
declare module '*.webp';