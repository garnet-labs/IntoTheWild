var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  addressListProps: () => addressListProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_button = require("../button");
var import_radio_group = require("../radio-group");
var import_checkbox_group = require("../checkbox-group");
var import_AddressListItem = __toESM(require("./AddressListItem"));
const [name, bem, t] = (0, import_utils.createNamespace)("address-list");
const addressListProps = {
  list: (0, import_utils.makeArrayProp)(),
  modelValue: [...import_utils.numericProp, Array],
  switchable: import_utils.truthProp,
  disabledText: String,
  disabledList: (0, import_utils.makeArrayProp)(),
  showAddButton: import_utils.truthProp,
  addButtonText: String,
  defaultTagText: String,
  rightIcon: (0, import_utils.makeStringProp)("edit")
};
var stdin_default = (0, import_vue.defineComponent)({
  name,
  props: addressListProps,
  emits: ["add", "edit", "select", "clickItem", "editDisabled", "selectDisabled", "update:modelValue"],
  setup(props, {
    slots,
    emit
  }) {
    const singleChoice = (0, import_vue.computed)(() => !Array.isArray(props.modelValue));
    const renderItem = (item, index, disabled) => {
      const onEdit = () => emit(disabled ? "editDisabled" : "edit", item, index);
      const onClick = (event) => emit("clickItem", item, index, {
        event
      });
      const onSelect = () => {
        emit(disabled ? "selectDisabled" : "select", item, index);
        if (!disabled) {
          if (singleChoice.value) {
            emit("update:modelValue", item.id);
          } else {
            const value = props.modelValue;
            if (value.includes(item.id)) {
              emit("update:modelValue", value.filter((id) => id !== item.id));
            } else {
              emit("update:modelValue", [...value, item.id]);
            }
          }
        }
      };
      return (0, import_vue.createVNode)(import_AddressListItem.default, {
        "key": item.id,
        "address": item,
        "disabled": disabled,
        "switchable": props.switchable,
        "singleChoice": singleChoice.value,
        "defaultTagText": props.defaultTagText,
        "rightIcon": props.rightIcon,
        "onEdit": onEdit,
        "onClick": onClick,
        "onSelect": onSelect
      }, {
        bottom: slots["item-bottom"],
        tag: slots.tag
      });
    };
    const renderList = (list, disabled) => {
      if (list) {
        return list.map((item, index) => renderItem(item, index, disabled));
      }
    };
    const renderBottom = () => props.showAddButton ? (0, import_vue.createVNode)("div", {
      "class": [bem("bottom"), "van-safe-area-bottom"]
    }, [(0, import_vue.createVNode)(import_button.Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "text": props.addButtonText || t("add"),
      "class": bem("add"),
      "onClick": () => emit("add")
    }, null)]) : void 0;
    return () => {
      var _a, _b;
      const List = renderList(props.list);
      const DisabledList = renderList(props.disabledList, true);
      const DisabledText = props.disabledText && (0, import_vue.createVNode)("div", {
        "class": bem("disabled-text")
      }, [props.disabledText]);
      return (0, import_vue.createVNode)("div", {
        "class": bem()
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), !singleChoice.value && Array.isArray(props.modelValue) ? (0, import_vue.createVNode)(import_checkbox_group.CheckboxGroup, {
        "modelValue": props.modelValue
      }, {
        default: () => [List]
      }) : (0, import_vue.createVNode)(import_radio_group.RadioGroup, {
        "modelValue": props.modelValue
      }, {
        default: () => [List]
      }), DisabledText, DisabledList, (_b = slots.default) == null ? void 0 : _b.call(slots), renderBottom()]);
    };
  }
});
