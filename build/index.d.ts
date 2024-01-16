import * as React from "react";
declare class Styler {
    stylesheet: string;
    gen: () => number;
    constructor();
    addStyles(_css: string): void;
    div(_css: TemplateStringsArray, ...args: any[]): {
        new (props: {
            className?: string;
        }): {
            element: StyledComponent;
            getClassName(): string;
            render(): React.ReactNode;
            context: unknown;
            setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<any>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
            forceUpdate(callback?: (() => void) | undefined): void;
            readonly props: Readonly<any>;
            state: Readonly<{}>;
            refs: {
                [key: string]: React.ReactInstance;
            };
            componentDidMount?(): void;
            shouldComponentUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): boolean;
            componentWillUnmount?(): void;
            componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
            getSnapshotBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<{}>): any;
            componentDidUpdate?(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void;
            componentWillMount?(): void;
            UNSAFE_componentWillMount?(): void;
            componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
            UNSAFE_componentWillReceiveProps?(nextProps: Readonly<any>, nextContext: any): void;
            componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): void;
            UNSAFE_componentWillUpdate?(nextProps: Readonly<any>, nextState: Readonly<{}>, nextContext: any): void;
        };
        contextType?: React.Context<any> | undefined;
    };
    getCSSBundle(): string;
}
export declare const ReactStyleBundler: Styler;
export declare function useGeneratedClass(BoundStyleElement: {
    prototype: {
        getClassName: Function;
    };
}): any;
/**
 *
 */
type Props = {
    comp_type: string;
    comp_id: string;
    className?: string;
};
declare class StyledComponent extends React.Component<Props> {
    comp_type: string;
    comp_id: string;
    constructor(props: {
        comp_type: string;
        comp_id: string;
        className?: string;
    });
    render(): React.ReactNode;
}
export {};
