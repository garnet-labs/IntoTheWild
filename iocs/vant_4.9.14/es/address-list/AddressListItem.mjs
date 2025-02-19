import { defineComponent, createVNode as _createVNode } from "vue";
import { extend, createNamespace, makeRequiredProp, makeStringProp } from "../utils/index.mjs";
import { Tag } from "../tag/index.mjs";
import { Icon } from "../icon/index.mjs";
import { Cell } from "../cell/index.mjs";
import { Radio } from "../radio/index.mjs";
import { Checkbox } from "../checkbox/index.mjs";
const [name, bem] = createNamespace("address-item");
var stdin_default = defineComponent({
  name,
  props: {
    address: makeRequiredProp(Object),
    disabled: Boolean,
    switchable: Boolean,
    singleChoice: Boolean,
    defaultTagText: String,
    rightIcon: makeStringProp("edit")
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
    const renderRightIcon = () => _createVNode(Icon, {
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
        return _createVNode(Tag, {
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
      const Info = [_createVNode("div", {
        "class": bem("name")
      }, [`${address.name} ${address.tel}`, renderTag()]), _createVNode("div", {
        "class": bem("address")
      }, [address.address])];
      if (switchable && !disabled) {
        if (singleChoice) {
          return _createVNode(Radio, {
            "name": address.id,
            "iconSize": 18
          }, {
            default: () => [Info]
          });
        } else {
          return _createVNode(Checkbox, {
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
      return _createVNode("div", {
        "class": bem({
          disabled
        }),
        "onClick": onClick
      }, [_createVNode(Cell, {
        "border": false,
        "titleClass": bem("title")
      }, {
        title: renderContent,
        "right-icon": renderRightIcon
      }), (_a = slots.bottom) == null ? void 0 : _a.call(slots, extend({}, props.address, {
        disabled
      }))]);
    };
  }
});
export {
  stdin_default as default
};
