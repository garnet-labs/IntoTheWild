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
  deepClone: () => deepClone
});
module.exports = __toCommonJS(stdin_exports);
var import_basic = require("./basic");
function deepClone(obj) {
  if (!(0, import_basic.isDef)(obj)) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }
  if ((0, import_basic.isObject)(obj)) {
    const to = {};
    Object.keys(obj).forEach((key) => {
      to[key] = deepClone(obj[key]);
    });
    return to;
  }
  return obj;
}
