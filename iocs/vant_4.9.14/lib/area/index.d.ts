export declare const Area: import("../utils").WithInstall<import("vue").DefineComponent<import("vue").ExtractPropTypes<import("../utils").Writeable<Pick<{
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    optionHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleOptionNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
}, "title" | "readonly" | "loading" | "optionHeight" | "swipeDuration" | "visibleOptionNum" | "cancelButtonText" | "confirmButtonText">> & {
    modelValue: StringConstructor;
    columnsNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    columnsPlaceholder: {
        type: import("vue").PropType<T[]>;
        default: () => never[];
    };
    areaList: {
        type: import("vue").PropType<import("./types").AreaList>;
        default: () => {};
    };
}>, () => import("vue/jsx-runtime").JSX.Element, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "cancel" | "change" | "confirm")[], "update:modelValue" | "cancel" | "change" | "confirm", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<import("../utils").Writeable<Pick<{
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    optionHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleOptionNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
}, "title" | "readonly" | "loading" | "optionHeight" | "swipeDuration" | "visibleOptionNum" | "cancelButtonText" | "confirmButtonText">> & {
    modelValue: StringConstructor;
    columnsNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    columnsPlaceholder: {
        type: import("vue").PropType<T[]>;
        default: () => never[];
    };
    areaList: {
        type: import("vue").PropType<import("./types").AreaList>;
        default: () => {};
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onCancel?: ((...args: any[]) => any) | undefined;
    onConfirm?: ((...args: any[]) => any) | undefined;
}>, {
    readonly: boolean;
    loading: boolean;
    optionHeight: string | number;
    swipeDuration: string | number;
    visibleOptionNum: string | number;
    columnsNum: string | number;
    columnsPlaceholder: string[];
    areaList: import("./types").AreaList;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>>;
export default Area;
export { areaProps } from './Area';
export type { AreaProps } from './Area';
export type { AreaList, AreaInstance } from './types';
declare module 'vue' {
    interface GlobalComponents {
        VanArea: typeof Area;
    }
}