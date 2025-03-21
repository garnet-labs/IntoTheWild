import { ref, watch, nextTick, onMounted, watchEffect, onBeforeUnmount, defineComponent, createVNode as _createVNode, Fragment as _Fragment, mergeProps as _mergeProps } from "vue";
import { createPopper, offsetModifier } from "@vant/popperjs";
import { pick, extend, inBrowser, truthProp, numericProp, unknownProp, BORDER_RIGHT, BORDER_BOTTOM, makeArrayProp, makeStringProp, createNamespace } from "../utils/index.mjs";
import { useClickAway } from "@vant/use";
import { useScopeId } from "../composables/use-scope-id.mjs";
import { useSyncPropRef } from "../composables/use-sync-prop-ref.mjs";
import { Icon } from "../icon/index.mjs";
import { Popup } from "../popup/index.mjs";
const [name, bem] = createNamespace("popover");
const popupProps = ["overlay", "duration", "teleport", "overlayStyle", "overlayClass", "closeOnClickOverlay"];
const popoverProps = {
  show: Boolean,
  theme: makeStringProp("light"),
  overlay: Boolean,
  actions: makeArrayProp(),
  actionsDirection: makeStringProp("vertical"),
  trigger: makeStringProp("click"),
  duration: numericProp,
  showArrow: truthProp,
  placement: makeStringProp("bottom"),
  iconPrefix: String,
  overlayClass: unknownProp,
  overlayStyle: Object,
  closeOnClickAction: truthProp,
  closeOnClickOverlay: truthProp,
  closeOnClickOutside: truthProp,
  offset: {
    type: Array,
    default: () => [0, 8]
  },
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default = defineComponent({
  name,
  props: popoverProps,
  emits: ["select", "touchstart", "update:show"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    let popper;
    const popupRef = ref();
    const wrapperRef = ref();
    const popoverRef = ref();
    const show = useSyncPropRef(() => props.show, (value) => emit("update:show", value));
    const getPopoverOptions = () => ({
      placement: props.placement,
      modifiers: [{
        name: "computeStyles",
        options: {
          adaptive: false,
          gpuAcceleration: false
        }
      }, extend({}, offsetModifier, {
        options: {
          offset: props.offset
        }
      })]
    });
    const createPopperInstance = () => {
      if (wrapperRef.value && popoverRef.value) {
        return createPopper(wrapperRef.value, popoverRef.value.popupRef.value, getPopoverOptions());
      }
      return null;
    };
    const updateLocation = () => {
      nextTick(() => {
        if (!show.value) {
          return;
        }
        if (!popper) {
          popper = createPopperInstance();
          if (inBrowser) {
            window.addEventListener("animationend", updateLocation);
            window.addEventListener("transitionend", updateLocation);
          }
        } else {
          popper.setOptions(getPopoverOptions());
        }
      });
    };
    const updateShow = (value) => {
      show.value = value;
    };
    const onClickWrapper = () => {
      if (props.trigger === "click") {
        show.value = !show.value;
      }
    };
    const onClickAction = (action, index) => {
      if (action.disabled) {
        return;
      }
      emit("select", action, index);
      if (props.closeOnClickAction) {
        show.value = false;
      }
    };
    const onClickAway = () => {
      if (show.value && props.closeOnClickOutside && (!props.overlay || props.closeOnClickOverlay)) {
        show.value = false;
      }
    };
    const renderActionContent = (action, index) => {
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [action.icon && _createVNode(Icon, {
        "name": action.icon,
        "classPrefix": props.iconPrefix,
        "class": bem("action-icon")
      }, null), _createVNode("div", {
        "class": [bem("action-text"), {
          [BORDER_BOTTOM]: props.actionsDirection === "vertical"
        }]
      }, [action.text])];
    };
    const renderAction = (action, index) => {
      const {
        icon,
        color,
        disabled,
        className
      } = action;
      return _createVNode("div", {
        "role": "menuitem",
        "class": [bem("action", {
          disabled,
          "with-icon": icon
        }), {
          [BORDER_RIGHT]: props.actionsDirection === "horizontal"
        }, className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : 0,
        "aria-disabled": disabled || void 0,
        "onClick": () => onClickAction(action, index)
      }, [renderActionContent(action, index)]);
    };
    onMounted(() => {
      updateLocation();
      watchEffect(() => {
        var _a;
        popupRef.value = (_a = popoverRef.value) == null ? void 0 : _a.popupRef.value;
      });
    });
    onBeforeUnmount(() => {
      if (popper) {
        if (inBrowser) {
          window.removeEventListener("animationend", updateLocation);
          window.removeEventListener("transitionend", updateLocation);
        }
        popper.destroy();
        popper = null;
      }
    });
    watch(() => [show.value, props.offset, props.placement], updateLocation);
    useClickAway([wrapperRef, popupRef], onClickAway, {
      eventName: "touchstart"
    });
    return () => {
      var _a;
      return _createVNode(_Fragment, null, [_createVNode("span", {
        "ref": wrapperRef,
        "class": bem("wrapper"),
        "onClick": onClickWrapper
      }, [(_a = slots.reference) == null ? void 0 : _a.call(slots)]), _createVNode(Popup, _mergeProps({
        "ref": popoverRef,
        "show": show.value,
        "class": bem([props.theme]),
        "position": "",
        "transition": "van-popover-zoom",
        "lockScroll": false,
        "onUpdate:show": updateShow
      }, attrs, useScopeId(), pick(props, popupProps)), {
        default: () => [props.showArrow && _createVNode("div", {
          "class": bem("arrow")
        }, null), _createVNode("div", {
          "role": "menu",
          "class": bem("content", props.actionsDirection)
        }, [slots.default ? slots.default() : props.actions.map(renderAction)])]
      })]);
    };
  }
});
export {
  stdin_default as default,
  popoverProps
};
