import { type PropType, type ExtractPropTypes } from 'vue';
import type { DialogTheme, DialogAction, DialogMessage, DialogMessageAlign } from './types';
export declare const dialogProps: {
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: PropType<import("vue").TeleportProps["to"]>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: PropType<import("../utils").Interceptor>;
    overlayStyle: PropType<import("vue").CSSProperties>;
    overlayClass: PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    title: StringConstructor;
    theme: PropType<DialogTheme>;
    width: (NumberConstructor | StringConstructor)[];
    message: PropType<DialogMessage>;
    callback: PropType<(action?: DialogAction) => void>;
    allowHtml: BooleanConstructor;
    className: PropType<unknown>;
    transition: {
        type: PropType<T>;
        default: string;
    };
    messageAlign: PropType<DialogMessageAlign>;
    closeOnPopstate: {
        type: BooleanConstructor;
        default: true;
    };
    showCancelButton: BooleanConstructor;
    cancelButtonText: StringConstructor;
    cancelButtonColor: StringConstructor;
    cancelButtonDisabled: BooleanConstructor;
    confirmButtonText: StringConstructor;
    confirmButtonColor: StringConstructor;
    confirmButtonDisabled: BooleanConstructor;
    showConfirmButton: {
        type: BooleanConstructor;
        default: true;
    };
    closeOnClickOverlay: BooleanConstructor;
    keyboardEnabled: {
        type: BooleanConstructor;
        default: true;
    };
};
export type DialogProps = ExtractPropTypes<typeof dialogProps>;
declare const _default: import("vue").DefineComponent<ExtractPropTypes<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: PropType<import("vue").TeleportProps["to"]>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: PropType<import("../utils").Interceptor>;
    overlayStyle: PropType<import("vue").CSSProperties>;
    overlayClass: PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    title: StringConstructor;
    theme: PropType<DialogTheme>;
    width: (NumberConstructor | StringConstructor)[];
    message: PropType<DialogMessage>;
    callback: PropType<(action?: DialogAction) => void>;
    allowHtml: BooleanConstructor;
    className: PropType<unknown>;
    transition: {
        type: PropType<T>;
        default: string;
    };
    messageAlign: PropType<DialogMessageAlign>;
    closeOnPopstate: {
        type: BooleanConstructor;
        default: true;
    };
    showCancelButton: BooleanConstructor;
    cancelButtonText: StringConstructor;
    cancelButtonColor: StringConstructor;
    cancelButtonDisabled: BooleanConstructor;
    confirmButtonText: StringConstructor;
    confirmButtonColor: StringConstructor;
    confirmButtonDisabled: BooleanConstructor;
    showConfirmButton: {
        type: BooleanConstructor;
        default: true;
    };
    closeOnClickOverlay: BooleanConstructor;
    keyboardEnabled: {
        type: BooleanConstructor;
        default: true;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("cancel" | "keydown" | "update:show" | "confirm")[], "cancel" | "keydown" | "update:show" | "confirm", import("vue").PublicProps, Readonly<ExtractPropTypes<{
    show: BooleanConstructor;
    zIndex: (NumberConstructor | StringConstructor)[];
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    duration: (NumberConstructor | StringConstructor)[];
    teleport: PropType<import("vue").TeleportProps["to"]>;
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: true;
    };
    beforeClose: PropType<import("../utils").Interceptor>;
    overlayStyle: PropType<import("vue").CSSProperties>;
    overlayClass: PropType<unknown>;
    transitionAppear: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
} & {
    title: StringConstructor;
    theme: PropType<DialogTheme>;
    width: (NumberConstructor | StringConstructor)[];
    message: PropType<DialogMessage>;
    callback: PropType<(action?: DialogAction) => void>;
    allowHtml: BooleanConstructor;
    className: PropType<unknown>;
    transition: {
        type: PropType<T>;
        default: string;
    };
    messageAlign: PropType<DialogMessageAlign>;
    closeOnPopstate: {
        type: BooleanConstructor;
        default: true;
    };
    showCancelButton: BooleanConstructor;
    cancelButtonText: StringConstructor;
    cancelButtonColor: StringConstructor;
    cancelButtonDisabled: BooleanConstructor;
    confirmButtonText: StringConstructor;
    confirmButtonColor: StringConstructor;
    confirmButtonDisabled: BooleanConstructor;
    showConfirmButton: {
        type: BooleanConstructor;
        default: true;
    };
    closeOnClickOverlay: BooleanConstructor;
    keyboardEnabled: {
        type: BooleanConstructor;
        default: true;
    };
}>> & Readonly<{
    onKeydown?: ((...args: any[]) => any) | undefined;
    "onUpdate:show"?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
}>, {
    overlay: boolean;
    show: boolean;
    lockScroll: boolean;
    lazyRender: boolean;
    transitionAppear: boolean;
    closeOnClickOverlay: boolean;
    transition: string;
    closeOnPopstate: boolean;
    allowHtml: boolean;
    showCancelButton: boolean;
    cancelButtonDisabled: boolean;
    confirmButtonDisabled: boolean;
    showConfirmButton: boolean;
    keyboardEnabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;