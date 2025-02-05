import { useRect, useWindowSize } from "@vant/use";
import { unref } from "vue";
import { isIOS as checkIsIOS } from "./basic.mjs";
function getScrollTop(el) {
  const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
}
function setScrollTop(el, value) {
  if ("scrollTop" in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}
function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}
function getElementTop(el, scroller) {
  if (el === window) {
    return 0;
  }
  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return useRect(el).top + scrollTop;
}
const isIOS = checkIsIOS();
function resetScroll() {
  if (isIOS) {
    setRootScrollTop(getRootScrollTop());
  }
}
const stopPropagation = (event) => event.stopPropagation();
function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== "boolean" || event.cancelable) {
    event.preventDefault();
  }
  if (isStopPropagation) {
    stopPropagation(event);
  }
}
function isHidden(elementRef) {
  const el = unref(elementRef);
  if (!el) {
    return false;
  }
  const style = window.getComputedStyle(el);
  const hidden = style.display === "none";
  const parentHidden = el.offsetParent === null && style.position !== "fixed";
  return hidden || parentHidden;
}
const { width: windowWidth, height: windowHeight } = useWindowSize();
function isContainingBlock(el) {
  const css = window.getComputedStyle(el);
  return css.transform !== "none" || css.perspective !== "none" || ["transform", "perspective", "filter"].some(
    (value) => (css.willChange || "").includes(value)
  );
}
function getContainingBlock(el) {
  let node = el.parentElement;
  while (node) {
    if (node && node.tagName !== "HTML" && node.tagName !== "BODY" && isContainingBlock(node)) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
}
export {
  getContainingBlock,
  getElementTop,
  getRootScrollTop,
  getScrollTop,
  isHidden,
  preventDefault,
  resetScroll,
  setRootScrollTop,
  setScrollTop,
  stopPropagation,
  windowHeight,
  windowWidth
};
