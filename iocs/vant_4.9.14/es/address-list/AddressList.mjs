import { defineComponent, computed, createVNode as _createVNode } from "vue";
import { truthProp, numericProp, makeArrayProp, createNamespace, makeStringProp } from "../utils/index.mjs";
import { Button } from "../button/index.mjs";
import { RadioGroup } from "../radio-group/index.mjs";
import { CheckboxGroup } from "../checkbox-group/index.mjs";
import AddressListItem from "./AddressListItem.mjs";
const [name, bem, t] = createNamespace("address-list");
const addressListProps = {
  list: makeArrayProp(),
  modelValue: [...numericProp, Array],
  switchable: truthProp,
  disabledText: String,
  disabledList: makeArrayProp(),
  showAddButton: truthProp,
  addButtonText: String,
  defaultTagText: String,
  rightIcon: makeStringProp("edit")
};
var stdin_default = defineComponent({
  name,
  props: addressListProps,
  emits: ["add", "edit", "select", "clickItem", "editDisabled", "selectDisabled", "update:modelValue"],
  setup(props, {
    slots,
    emit
  }) {
    const singleChoice = computed(() => !Array.isArray(props.modelValue));
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
      return _createVNode(AddressListItem, {
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
    const renderBottom = () => props.showAddButton ? _createVNode("div", {
      "class": [bem("bottom"), "van-safe-area-bottom"]
    }, [_createVNode(Button, {
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
      const DisabledText = props.disabledText && _createVNode("div", {
        "class": bem("disabled-text")
      }, [props.disabledText]);
      return _createVNode("div", {
        "class": bem()
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), !singleChoice.value && Array.isArray(props.modelValue) ? _createVNode(CheckboxGroup, {
        "modelValue": props.modelValue
      }, {
        default: () => [List]
      }) : _createVNode(RadioGroup, {
        "modelValue": props.modelValue
      }, {
        default: () => [List]
      }), DisabledText, DisabledList, (_b = slots.default) == null ? void 0 : _b.call(slots), renderBottom()]);
    };
  }
});
export {
  addressListProps,
  stdin_default as default
};
