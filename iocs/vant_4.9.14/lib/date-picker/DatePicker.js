var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  datePickerProps: () => datePickerProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("./utils");
var import_use_expose = require("../composables/use-expose");
var import_picker = require("../picker");
const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
const [name] = (0, import_utils.createNamespace)("date-picker");
const datePickerProps = (0, import_utils.extend)({}, import_utils2.sharedProps, {
  columnsType: {
    type: Array,
    default: () => ["year", "month", "day"]
  },
  minDate: {
    type: Date,
    default: () => new Date(currentYear - 10, 0, 1),
    validator: import_utils.isDate
  },
  maxDate: {
    type: Date,
    default: () => new Date(currentYear + 10, 11, 31),
    validator: import_utils.isDate
  }
});
var stdin_default = (0, import_vue.defineComponent)({
  name,
  props: datePickerProps,
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const currentValues = (0, import_vue.ref)(props.modelValue);
    const updatedByExternalSources = (0, import_vue.ref)(false);
    const pickerRef = (0, import_vue.ref)();
    const computedValues = (0, import_vue.computed)(() => updatedByExternalSources.value ? props.modelValue : currentValues.value);
    const isMinYear = (year) => year === props.minDate.getFullYear();
    const isMaxYear = (year) => year === props.maxDate.getFullYear();
    const isMinMonth = (month) => month === props.minDate.getMonth() + 1;
    const isMaxMonth = (month) => month === props.maxDate.getMonth() + 1;
    const getValue = (type) => {
      const {
        minDate,
        columnsType
      } = props;
      const index = columnsType.indexOf(type);
      const value = computedValues.value[index];
      if (value) {
        return +value;
      }
      switch (type) {
        case "year":
          return minDate.getFullYear();
        case "month":
          return minDate.getMonth() + 1;
        case "day":
          return minDate.getDate();
      }
    };
    const genYearOptions = () => {
      const minYear = props.minDate.getFullYear();
      const maxYear = props.maxDate.getFullYear();
      return (0, import_utils2.genOptions)(minYear, maxYear, "year", props.formatter, props.filter, computedValues.value);
    };
    const genMonthOptions = () => {
      const year = getValue("year");
      const minMonth = isMinYear(year) ? props.minDate.getMonth() + 1 : 1;
      const maxMonth = isMaxYear(year) ? props.maxDate.getMonth() + 1 : 12;
      return (0, import_utils2.genOptions)(minMonth, maxMonth, "month", props.formatter, props.filter, computedValues.value);
    };
    const genDayOptions = () => {
      const year = getValue("year");
      const month = getValue("month");
      const minDate = isMinYear(year) && isMinMonth(month) ? props.minDate.getDate() : 1;
      const maxDate = isMaxYear(year) && isMaxMonth(month) ? props.maxDate.getDate() : (0, import_utils2.getMonthEndDay)(year, month);
      return (0, import_utils2.genOptions)(minDate, maxDate, "day", props.formatter, props.filter, computedValues.value);
    };
    const confirm = () => {
      var _a;
      return (_a = pickerRef.value) == null ? void 0 : _a.confirm();
    };
    const getSelectedDate = () => currentValues.value;
    const columns = (0, import_vue.computed)(() => props.columnsType.map((type) => {
      switch (type) {
        case "year":
          return genYearOptions();
        case "month":
          return genMonthOptions();
        case "day":
          return genDayOptions();
        default:
          if (process.env.NODE_ENV !== "production") {
            throw new Error(`[Vant] DatePicker: unsupported columns type: ${type}`);
          }
          return [];
      }
    }));
    (0, import_vue.watch)(currentValues, (newValues) => {
      if (!(0, import_utils.isSameValue)(newValues, props.modelValue)) {
        emit("update:modelValue", newValues);
      }
    });
    (0, import_vue.watch)(() => props.modelValue, (newValues, oldValues) => {
      updatedByExternalSources.value = (0, import_utils.isSameValue)(oldValues, currentValues.value);
      newValues = (0, import_utils2.formatValueRange)(newValues, columns.value);
      if (!(0, import_utils.isSameValue)(newValues, currentValues.value)) {
        currentValues.value = newValues;
      }
      updatedByExternalSources.value = false;
    }, {
      immediate: true
    });
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    (0, import_use_expose.useExpose)({
      confirm,
      getSelectedDate
    });
    return () => (0, import_vue.createVNode)(import_picker.Picker, (0, import_vue.mergeProps)({
      "ref": pickerRef,
      "modelValue": currentValues.value,
      "onUpdate:modelValue": ($event) => currentValues.value = $event,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, (0, import_utils.pick)(props, import_utils2.pickerInheritKeys)), slots);
  }
});
