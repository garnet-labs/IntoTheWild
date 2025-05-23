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
  PICKER_GROUP_KEY: () => PICKER_GROUP_KEY,
  default: () => stdin_default,
  pickerGroupProps: () => pickerGroupProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_sync_prop_ref = require("../composables/use-sync-prop-ref");
var import_tab = require("../tab");
var import_tabs = require("../tabs");
var import_PickerToolbar = __toESM(require("../picker/PickerToolbar"));
const [name, bem] = (0, import_utils.createNamespace)("picker-group");
const PICKER_GROUP_KEY = Symbol(name);
const pickerGroupProps = (0, import_utils.extend)({
  tabs: (0, import_utils.makeArrayProp)(),
  activeTab: (0, import_utils.makeNumericProp)(0),
  nextStepText: String,
  showToolbar: import_utils.truthProp
}, import_PickerToolbar.pickerToolbarProps);
var stdin_default = (0, import_vue.defineComponent)({
  name,
  props: pickerGroupProps,
  emits: ["confirm", "cancel", "update:activeTab"],
  setup(props, {
    emit,
    slots
  }) {
    const activeTab = (0, import_use_sync_prop_ref.useSyncPropRef)(() => props.activeTab, (value) => emit("update:activeTab", value));
    const {
      children,
      linkChildren
    } = (0, import_use.useChildren)(PICKER_GROUP_KEY);
    linkChildren();
    const showNextButton = () => +activeTab.value < props.tabs.length - 1 && props.nextStepText;
    const onConfirm = () => {
      if (showNextButton()) {
        activeTab.value = +activeTab.value + 1;
      } else {
        emit("confirm", children.map((item) => item.confirm()));
      }
    };
    const onCancel = () => emit("cancel");
    return () => {
      var _a, _b;
      let childNodes = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b.filter((node) => node.type !== import_vue.Comment).map((node) => {
        if (node.type === import_vue.Fragment) {
          return node.children;
        }
        return node;
      });
      if (childNodes) {
        childNodes = (0, import_utils.flat)(childNodes);
      }
      const confirmButtonText = showNextButton() ? props.nextStepText : props.confirmButtonText;
      return (0, import_vue.createVNode)("div", {
        "class": bem()
      }, [props.showToolbar ? (0, import_vue.createVNode)(import_PickerToolbar.default, {
        "title": props.title,
        "cancelButtonText": props.cancelButtonText,
        "confirmButtonText": confirmButtonText,
        "onConfirm": onConfirm,
        "onCancel": onCancel
      }, (0, import_utils.pick)(slots, import_PickerToolbar.pickerToolbarSlots)) : null, (0, import_vue.createVNode)(import_tabs.Tabs, {
        "active": activeTab.value,
        "onUpdate:active": ($event) => activeTab.value = $event,
        "class": bem("tabs"),
        "shrink": true,
        "animated": true,
        "lazyRender": false
      }, {
        default: () => [props.tabs.map((title, index) => (0, import_vue.createVNode)(import_tab.Tab, {
          "title": title,
          "titleClass": bem("tab-title")
        }, {
          default: () => [childNodes == null ? void 0 : childNodes[index]]
        }))]
      })]);
    };
  }
});
