import { defineComponent, mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { pick, extend, createNamespace } from "../utils/index.mjs";
import { RADIO_KEY } from "../radio-group/RadioGroup.mjs";
import { useParent } from "@vant/use";
import Checker, { checkerProps } from "../checkbox/Checker.mjs";
const radioProps = extend({}, checkerProps, {
  shape: String
});
const [name, bem] = createNamespace("radio");
var stdin_default = defineComponent({
  name,
  props: radioProps,
  emits: ["update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      parent
    } = useParent(RADIO_KEY);
    const checked = () => {
      const value = parent ? parent.props.modelValue : props.modelValue;
      return value === props.name;
    };
    const toggle = () => {
      if (parent) {
        parent.updateValue(props.name);
      } else {
        emit("update:modelValue", props.name);
      }
    };
    return () => _createVNode(Checker, _mergeProps({
      "bem": bem,
      "role": "radio",
      "parent": parent,
      "checked": checked(),
      "onToggle": toggle
    }, props), pick(slots, ["default", "icon"]));
  }
});
export {
  stdin_default as default,
  radioProps
};
