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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_tag = require("../tag");
var import_icon = require("../icon");
var import_cell = require("../cell");
var import_radio = require("../radio");
var import_checkbox = require("../checkbox");
const [name, bem] = (0, import_utils.createNamespace)("address-item");
var stdin_default = (0, import_vue.defineComponent)({
  name,
  props: {
    address: (0, import_utils.makeRequiredProp)(Object),
    disabled: Boolean,
    switchable: Boolean,
    singleChoice: Boolean,
    defaultTagText: String,
    rightIcon: (0, import_utils.makeStringProp)("edit")
  },
  emits: ["edit", "click", "select"],
  setup(props, {
    slots,
    emit
  }) {
    const onClick = (event) => {
      if (props.switchable) {
        emit("select");
      }
      emit("click", event);
    };
    const renderRightIcon = () => (0, import_vue.createVNode)(import_icon.Icon, {
      "name": props.rightIcon,
      "class": bem("edit"),
      "onClick": (event) => {
        event.stopPropagation();
        emit("edit");
        emit("click", event);
      }
    }, null);
    const renderTag = () => {
      if (slots.tag) {
        return slots.tag(props.address);
      }
      if (props.address.isDefault && props.defaultTagText) {
        return (0, import_vue.createVNode)(import_tag.Tag, {
          "type": "primary",
          "round": true,
          "class": bem("tag")
        }, {
          default: () => [props.defaultTagText]
        });
      }
    };
    const renderContent = () => {
      const {
        address,
        disabled,
        switchable,
        singleChoice
      } = props;
      const Info = [(0, import_vue.createVNode)("div", {
        "class": bem("name")
      }, [`${address.name} ${address.tel}`, renderTag()]), (0, import_vue.createVNode)("div", {
        "class": bem("address")
      }, [address.address])];
      if (switchable && !disabled) {
        if (singleChoice) {
          return (0, import_vue.createVNode)(import_radio.Radio, {
            "name": address.id,
            "iconSize": 18
          }, {
            default: () => [Info]
          });
        } else {
          return (0, import_vue.createVNode)(import_checkbox.Checkbox, {
            "name": address.id,
            "iconSize": 18
          }, {
            default: () => [Info]
          });
        }
      }
      return Info;
    };
    return () => {
      var _a;
      const {
        disabled
      } = props;
      return (0, import_vue.createVNode)("div", {
        "class": bem({
          disabled
        }),
        "onClick": onClick
      }, [(0, import_vue.createVNode)(import_cell.Cell, {
        "border": false,
        "titleClass": bem("title")
      }, {
        title: renderContent,
        "right-icon": renderRightIcon
      }), (_a = slots.bottom) == null ? void 0 : _a.call(slots, (0, import_utils.extend)({}, props.address, {
        disabled
      }))]);
    };
  }
});
