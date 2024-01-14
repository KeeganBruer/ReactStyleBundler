import * as React from "react";
declare class Styler {
    stylesheet: string;
    gen: () => number;
    constructor();
    addStyles(_css: string): void;
    div(_css: TemplateStringsArray): (props: any) => React.JSX.Element;
    getCSSBundle(): string;
}
export declare const ReactStyleBundler: Styler;
export {};
