import { type Numeric } from '../utils';
import type { Ref } from 'vue';
import type { PickerOption, PickerColumn, PickerFieldNames } from './types';
declare const name: string, bem: (el?: import("../utils").Mods, mods?: import("../utils").Mods) => import("../utils").Mods, t: (path: string, ...args: unknown[]) => any;
export { name, bem, t };
export declare const getFirstEnabledOption: (options: PickerOption[]) => PickerOption | undefined;
export declare function getColumnsType(columns: PickerColumn | PickerColumn[], fields: Required<PickerFieldNames>): "default" | "multiple" | "cascade";
export declare function findIndexOfEnabledOption(options: PickerOption[], index: number): number;
export declare const isOptionExist: (options: PickerOption[], value: Numeric | undefined, fields: Required<PickerFieldNames>) => boolean;
export declare function findOptionByValue(options: PickerOption[], value: Numeric, fields: Required<PickerFieldNames>): PickerOption | undefined;
export declare function formatCascadeColumns(columns: PickerColumn | PickerColumn[], fields: Required<PickerFieldNames>, selectedValues: Ref<Numeric[]>): PickerColumn[];
export declare function getElementTranslateY(element: Element): number;
export declare function assignDefaultFields(fields: PickerFieldNames | undefined): Required<PickerFieldNames>;
