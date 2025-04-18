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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var stdin_default = {
  name: "\u09A8\u09BE\u09AE",
  tel: "\u09AB\u09CB\u09A8",
  save: "\u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u0995\u09B0\u09C1\u09A8",
  clear: "\u09AA\u09B0\u09BF\u09B7\u09CD\u0995\u09BE\u09B0",
  cancel: "\u09AC\u09BE\u09A4\u09BF\u09B2",
  confirm: "\u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8",
  delete: "\u09AE\u09C1\u099B\u09C1\u09A8",
  loading: "\u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7...",
  noCoupon: "\u0995\u09CB\u09A8 \u0995\u09C1\u09AA\u09A8 \u09A8\u09C7\u0987",
  nameEmpty: "\u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u09A8\u09BE\u09AE\u099F\u09BF \u09AA\u09C2\u09B0\u09A3 \u0995\u09B0\u09C1\u09A8",
  addContact: "\u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8",
  telInvalid: "\u09AC\u09BF\u0995\u09C3\u09A4 \u09AB\u09CB\u09A8 \u09A8\u09AE\u09CD\u09AC\u09B0",
  vanCalendar: {
    end: "\u09B6\u09C7\u09B7",
    start: "\u09B6\u09C1\u09B0\u09C1",
    title: "\u0995\u09CD\u09AF\u09BE\u09B2\u09C7\u09A8\u09CD\u09A1\u09BE\u09B0",
    weekdays: [
      "\u09B0\u09AC\u09BF\u09AC\u09BE\u09B0",
      "\u09B8\u09CB\u09AE\u09AC\u09BE\u09B0",
      "\u09AE\u0999\u09CD\u0997\u09B2\u09AC\u09BE\u09B0",
      "\u09AC\u09C1\u09A7\u09AC\u09BE\u09B0",
      "\u09AC\u09C3\u09B9\u09B8\u09CD\u09AA\u09A4\u09BF\u09AC\u09BE\u09B0",
      "\u09B6\u09C1\u0995\u09CD\u09B0\u09AC\u09BE\u09B0",
      "\u09B6\u09A8\u09BF\u09AC\u09BE\u09B0"
    ],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `${maxRange} \u09A6\u09BF\u09A8\u09C7\u09B0 \u09AC\u09C7\u09B6\u09BF \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09AC\u09C7\u09A8 \u09A8\u09BE`
  },
  vanCascader: {
    select: "\u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8"
  },
  vanPagination: {
    prev: "\u09AA\u09C2\u09B0\u09CD\u09AC\u09AC\u09B0\u09CD\u09A4\u09C0",
    next: "\u09AA\u09B0\u09AC\u09B0\u09CD\u09A4\u09C0"
  },
  vanPullRefresh: {
    pulling: "\u09B0\u09BF\u09AB\u09CD\u09B0\u09C7\u09B6 \u0995\u09B0\u09A4\u09C7 \u099F\u09BE\u09A8\u09C1\u09A8...",
    loosing: "\u09B0\u09BF\u09AB\u09CD\u09B0\u09C7\u09B6 \u0995\u09B0\u09A4\u09C7 \u0986\u09B2\u0997\u09BE..."
  },
  vanSubmitBar: {
    label: "\u09AE\u09CB\u099F:"
  },
  vanCoupon: {
    unlimited: "\u0986\u09A8\u09B2\u09BF\u09AE\u09BF\u099F\u09C7\u09A1",
    discount: (discount) => `${discount * 10}% \u099B\u09BE\u09A1\u09BC`,
    condition: (condition) => `\u0985\u09A8\u09CD\u09A4\u09A4 ${condition}`
  },
  vanCouponCell: {
    title: "\u0995\u09C1\u09AA\u09A8",
    count: (count) => `\u0986\u09AA\u09A8\u09BE\u09B0 ${count} \u0995\u09C1\u09AA\u09A8 \u0986\u099B\u09C7`
  },
  vanCouponList: {
    exchange: "\u09AC\u09BF\u09A8\u09BF\u09AE\u09AF\u09BC",
    close: "\u09AC\u09A8\u09CD\u09A7",
    enable: "\u0989\u09AA\u09B2\u09AD\u09CD\u09AF",
    disabled: "\u0985\u09A8\u09C1\u09AA\u09B2\u09AC\u09CD\u09A7",
    placeholder: "\u0995\u09C1\u09AA\u09A8 \u0995\u09CB\u09A1"
  },
  vanAddressEdit: {
    area: "\u098F\u09B0\u09BF\u09AF\u09BC\u09BE",
    areaEmpty: "\u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u098F\u0995\u099F\u09BF \u09B0\u09BF\u09B8\u09BF\u09AD\u09BF\u0982 \u098F\u09B2\u09BE\u0995\u09BE \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
    addressEmpty: "\u09A0\u09BF\u0995\u09BE\u09A8\u09BE \u0996\u09BE\u09B2\u09BF \u09B9\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7 \u09A8\u09BE",
    addressDetail: "\u09A0\u09BF\u0995\u09BE\u09A8\u09BE",
    defaultAddress: "\u09A1\u09BF\u09AB\u09B2\u09CD\u099F \u09A0\u09BF\u0995\u09BE\u09A8\u09BE \u09B9\u09BF\u09B8\u09BE\u09AC\u09C7 \u09B8\u09C7\u099F \u0995\u09B0\u09C1\u09A8"
  },
  vanAddressList: {
    add: "\u09A8\u09A4\u09C1\u09A8 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8"
  }
};
