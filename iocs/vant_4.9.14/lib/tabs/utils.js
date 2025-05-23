var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
  scrollLeftTo: () => scrollLeftTo,
  scrollTopTo: () => scrollTopTo
});
module.exports = __toCommonJS(stdin_exports);
var import_use = require("@vant/use");
var import_utils = require("../utils");
function scrollLeftTo(scroller, to, duration) {
  let rafId;
  let count = 0;
  const from = scroller.scrollLeft;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  let scrollLeft = from;
  function cancel() {
    (0, import_use.cancelRaf)(rafId);
  }
  function animate() {
    scrollLeft += (to - from) / frames;
    scroller.scrollLeft = scrollLeft;
    if (++count < frames) {
      rafId = (0, import_use.raf)(animate);
    }
  }
  animate();
  return cancel;
}
function scrollTopTo(scroller, to, duration, callback) {
  let rafId;
  let current = (0, import_utils.getScrollTop)(scroller);
  const isDown = current < to;
  const frames = duration === 0 ? 1 : Math.round(duration * 1e3 / 16);
  const step = (to - current) / frames;
  function cancel() {
    (0, import_use.cancelRaf)(rafId);
  }
  function animate() {
    current += step;
    if (isDown && current > to || !isDown && current < to) {
      current = to;
    }
    (0, import_utils.setScrollTop)(scroller, current);
    if (isDown && current < to || !isDown && current > to) {
      rafId = (0, import_use.raf)(animate);
    } else if (callback) {
      rafId = (0, import_use.raf)(callback);
    }
  }
  animate();
  return cancel;
}
