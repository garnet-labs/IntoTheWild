export declare const FloatingBubble: import("../utils").WithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    gap: {
        type: NumberConstructor;
        default: number;
    };
    icon: StringConstructor;
    axis: {
        type: import("vue").PropType<T>;
        default: import("./types").FloatingBubbleAxis;
    };
    magnetic: import("vue").PropType<import("./types").FloatingBubbleMagnetic>;
    offset: {
        type: import("vue").PropType<import("./types").FloatingBubbleOffset>;
        default: () => {
            x: number;
            y: number;
        };
    };
    teleport: {
        type: import("vue").PropType<import("vue").TeleportProps["to"]>;
        default: string;
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("click" | "update:offset" | "offsetChange")[], "click" | "update:offset" | "offsetChange", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    gap: {
        type: NumberConstructor;
        default: number;
    };
    icon: StringConstructor;
    axis: {
        type: import("vue").PropType<T>;
        default: import("./types").FloatingBubbleAxis;
    };
    magnetic: import("vue").PropType<import("./types").FloatingBubbleMagnetic>;
    offset: {
        type: import("vue").PropType<import("./types").FloatingBubbleOffset>;
        default: () => {
            x: number;
            y: number;
        };
    };
    teleport: {
        type: import("vue").PropType<import("vue").TeleportProps["to"]>;
        default: string;
    };
}>> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    "onUpdate:offset"?: ((...args: any[]) => any) | undefined;
    onOffsetChange?: ((...args: any[]) => any) | undefined;
}>, {
    offset: import("./types").FloatingBubbleOffset;
    teleport: string | import("vue").RendererElement | null | undefined;
    gap: number;
    axis: import("./types").FloatingBubbleAxis;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default FloatingBubble;
export { floatingBubbleProps } from './FloatingBubble';
export type { FloatingBubbleProps } from './FloatingBubble';
export type { FloatingBubbleThemeVars, FloatingBubbleAxis, FloatingBubbleMagnetic, FloatingBubbleOffset, } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanFloatingBubble: typeof FloatingBubble;
    }
}