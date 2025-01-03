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
  default: () => stdin_default,
  timePickerProps: () => timePickerProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../date-picker/utils");
var import_utils2 = require("../utils");
var import_use_expose = require("../composables/use-expose");
var import_picker = require("../picker");
const [name] = (0, import_utils2.createNamespace)("time-picker");
const validateTime = (val) => /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/.test(val);
const fullColumns = ["hour", "minute", "second"];
const timePickerProps = (0, import_utils2.extend)({}, import_utils.sharedProps, {
  minHour: (0, import_utils2.makeNumericProp)(0),
  maxHour: (0, import_utils2.makeNumericProp)(23),
  minMinute: (0, import_utils2.makeNumericProp)(0),
  maxMinute: (0, import_utils2.makeNumericProp)(59),
  minSecond: (0, import_utils2.makeNumericProp)(0),
  maxSecond: (0, import_utils2.makeNumericProp)(59),
  minTime: {
    type: String,
    validator: validateTime
  },
  maxTime: {
    type: String,
    validator: validateTime
  },
  columnsType: {
    type: Array,
    default: () => ["hour", "minute"]
  }
});
var stdin_default = (0, import_vue.defineComponent)({
  name,
  props: timePickerProps,
  emits: ["confirm", "cancel", "change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const currentValues = (0, import_vue.ref)(props.modelValue);
    const pickerRef = (0, import_vue.ref)();
    const getValidTime = (time) => {
      const timeLimitArr = time.split(":");
      return fullColumns.map((col, i) => props.columnsType.includes(col) ? timeLimitArr[i] : "00");
    };
    const confirm = () => {
      var _a;
      return (_a = pickerRef.value) == null ? void 0 : _a.confirm();
    };
    const getSelectedTime = () => currentValues.value;
    const columns = (0, import_vue.computed)(() => {
      let {
        minHour,
        maxHour,
        minMinute,
        maxMinute,
        minSecond,
        maxSecond
      } = props;
      if (props.minTime || props.maxTime) {
        const fullTime = {
          hour: 0,
          minute: 0,
          second: 0
        };
        props.columnsType.forEach((col, i) => {
          var _a;
          fullTime[col] = (_a = currentValues.value[i]) != null ? _a : 0;
        });
        const {
          hour,
          minute
        } = fullTime;
        if (props.minTime) {
          const [minH, minM, minS] = getValidTime(props.minTime);
          minHour = minH;
          minMinute = +hour <= +minHour ? minM : "00";
          minSecond = +hour <= +minHour && +minute <= +minMinute ? minS : "00";
        }
        if (props.maxTime) {
          const [maxH, maxM, maxS] = getValidTime(props.maxTime);
          maxHour = maxH;
          maxMinute = +hour >= +maxHour ? maxM : "59";
          maxSecond = +hour >= +maxHour && +minute >= +maxMinute ? maxS : "59";
        }
      }
      return props.columnsType.map((type) => {
        const {
          filter,
          formatter
        } = props;
        switch (type) {
          case "hour":
            return (0, import_utils.genOptions)(+minHour, +maxHour, type, formatter, filter, currentValues.value);
          case "minute":
            return (0, import_utils.genOptions)(+minMinute, +maxMinute, type, formatter, filter, currentValues.value);
          case "second":
            return (0, import_utils.genOptions)(+minSecond, +maxSecond, type, formatter, filter, currentValues.value);
          default:
            if (process.env.NODE_ENV !== "production") {
              throw new Error(`[Vant] DatePicker: unsupported columns type: ${type}`);
            }
            return [];
        }
      });
    });
    (0, import_vue.watch)(currentValues, (newValues) => {
      if (!(0, import_utils2.isSameValue)(newValues, props.modelValue)) {
        emit("update:modelValue", newValues);
      }
    });
    (0, import_vue.watch)(() => props.modelValue, (newValues) => {
      newValues = (0, import_utils.formatValueRange)(newValues, columns.value);
      if (!(0, import_utils2.isSameValue)(newValues, currentValues.value)) {
        currentValues.value = newValues;
      }
    }, {
      immediate: true
    });
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    (0, import_use_expose.useExpose)({
      confirm,
      getSelectedTime
    });
    return () => (0, import_vue.createVNode)(import_picker.Picker, (0, import_vue.mergeProps)({
      "ref": pickerRef,
      "modelValue": currentValues.value,
      "onUpdate:modelValue": ($event) => currentValues.value = $event,
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, (0, import_utils2.pick)(props, import_utils.pickerInheritKeys)), slots);
  }
});
