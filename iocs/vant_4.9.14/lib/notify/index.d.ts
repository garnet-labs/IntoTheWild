export declare const Notify: import("../utils").WithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: import("vue").PropType<import("vue").TeleportProps["to"]>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: import("vue").PropType<import("../utils").Interceptor>;
    overlayStyle: import("vue").PropType<import("vue").CSSProperties>;
    overlayClass: import("vue").PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    type: {
        type: import("vue").PropType<T>;
        default: import("./types").NotifyType;
    };
    color: StringConstructor;
    message: (NumberConstructor | StringConstructor)[];
    position: {
        type: import("vue").PropType<T>;
        default: import("./types").NotifyPosition;
    };
    className: import("vue").PropType<unknown>;
    background: StringConstructor;
    lockScroll: BooleanConstructor;
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:show"[], "update:show", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: import("vue").PropType<import("vue").TeleportProps["to"]>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: import("vue").PropType<import("../utils").Interceptor>;
    overlayStyle: import("vue").PropType<import("vue").CSSProperties>;
    overlayClass: import("vue").PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    type: {
        type: import("vue").PropType<T>;
        default: import("./types").NotifyType;
    };
    color: StringConstructor;
    message: (NumberConstructor | StringConstructor)[];
    position: {
        type: import("vue").PropType<T>;
        default: import("./types").NotifyPosition;
    };
    className: import("vue").PropType<unknown>;
    background: StringConstructor;
    lockScroll: BooleanConstructor;
}>> & Readonly<{
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
}>, {
    type: import("./types").NotifyType;
    position: import("./types").NotifyPosition;
    overlay: boolean;
    show: boolean;
    lockScroll: boolean;
    lazyRender: boolean;
    transitionAppear: boolean;
    closeOnClickOverlay: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default Notify;
export { notifyProps } from './Notify';
export { showNotify, closeNotify, setNotifyDefaultOptions, resetNotifyDefaultOptions, } from './function-call';
export type { NotifyProps } from './Notify';
export type { NotifyType, NotifyOptions, NotifyThemeVars } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanNotify: typeof Notify;
    }
}