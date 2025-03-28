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
  default: () => stdin_default,
  uploaderProps: () => uploaderProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("./utils");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
var import_icon = require("../icon");
var import_image_preview = require("../image-preview");
var import_UploaderPreviewItem = __toESM(require("./UploaderPreviewItem"));
const uploaderProps = {
  name: (0, import_utils.makeNumericProp)(""),
  accept: (0, import_utils.makeStringProp)("image/*"),
  capture: String,
  multiple: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  lazyLoad: Boolean,
  maxCount: (0, import_utils.makeNumericProp)(Infinity),
  imageFit: (0, import_utils.makeStringProp)("cover"),
  resultType: (0, import_utils.makeStringProp)("dataUrl"),
  uploadIcon: (0, import_utils.makeStringProp)("photograph"),
  uploadText: String,
  deletable: import_utils.truthProp,
  reupload: Boolean,
  afterRead: Function,
  showUpload: import_utils.truthProp,
  modelValue: (0, import_utils.makeArrayProp)(),
  beforeRead: Function,
  beforeDelete: Function,
  previewSize: [Number, String, Array],
  previewImage: import_utils.truthProp,
  previewOptions: Object,
  previewFullImage: import_utils.truthProp,
  maxSize: {
    type: [Number, String, Function],
    default: Infinity
  }
};
var stdin_default = (0, import_vue.defineComponent)({
  name: import_utils2.name,
  props: uploaderProps,
  emits: ["delete", "oversize", "clickUpload", "closePreview", "clickPreview", "clickReupload", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const inputRef = (0, import_vue.ref)();
    const urls = [];
    const reuploadIndex = (0, import_vue.ref)(-1);
    const isReuploading = (0, import_vue.ref)(false);
    const getDetail = (index = props.modelValue.length) => ({
      name: props.name,
      index
    });
    const resetInput = () => {
      if (inputRef.value) {
        inputRef.value.value = "";
      }
    };
    const onAfterRead = (items) => {
      resetInput();
      if ((0, import_utils2.isOversize)(items, props.maxSize)) {
        if (Array.isArray(items)) {
          const result = (0, import_utils2.filterFiles)(items, props.maxSize);
          items = result.valid;
          emit("oversize", result.invalid, getDetail());
          if (!items.length) {
            return;
          }
        } else {
          emit("oversize", items, getDetail());
          return;
        }
      }
      items = (0, import_vue.reactive)(items);
      if (reuploadIndex.value > -1) {
        const arr = [...props.modelValue];
        arr.splice(reuploadIndex.value, 1, items);
        emit("update:modelValue", arr);
        reuploadIndex.value = -1;
      } else {
        emit("update:modelValue", [...props.modelValue, ...(0, import_utils.toArray)(items)]);
      }
      if (props.afterRead) {
        props.afterRead(items, getDetail());
      }
    };
    const readFile = (files) => {
      const {
        maxCount,
        modelValue,
        resultType
      } = props;
      if (Array.isArray(files)) {
        const remainCount = +maxCount - modelValue.length;
        if (files.length > remainCount) {
          files = files.slice(0, remainCount);
        }
        Promise.all(files.map((file) => (0, import_utils2.readFileContent)(file, resultType))).then((contents) => {
          const fileList = files.map((file, index) => {
            const result = {
              file,
              status: "",
              message: "",
              objectUrl: URL.createObjectURL(file)
            };
            if (contents[index]) {
              result.content = contents[index];
            }
            return result;
          });
          onAfterRead(fileList);
        });
      } else {
        (0, import_utils2.readFileContent)(files, resultType).then((content) => {
          const result = {
            file: files,
            status: "",
            message: "",
            objectUrl: URL.createObjectURL(files)
          };
          if (content) {
            result.content = content;
          }
          onAfterRead(result);
        });
      }
    };
    const onChange = (event) => {
      const {
        files
      } = event.target;
      if (props.disabled || !files || !files.length) {
        return;
      }
      const file = files.length === 1 ? files[0] : [].slice.call(files);
      if (props.beforeRead) {
        const response = props.beforeRead(file, getDetail());
        if (!response) {
          resetInput();
          return;
        }
        if ((0, import_utils.isPromise)(response)) {
          response.then((data) => {
            if (data) {
              readFile(data);
            } else {
              readFile(file);
            }
          }).catch(resetInput);
          return;
        }
      }
      readFile(file);
    };
    let imagePreview;
    const onClosePreview = () => emit("closePreview");
    const previewImage = (item) => {
      if (props.previewFullImage) {
        const imageFiles = props.modelValue.filter(import_utils2.isImageFile);
        const images = imageFiles.map((item2) => {
          if (item2.objectUrl && !item2.url && item2.status !== "failed") {
            item2.url = item2.objectUrl;
            urls.push(item2.url);
          }
          return item2.url;
        }).filter(Boolean);
        imagePreview = (0, import_image_preview.showImagePreview)((0, import_utils.extend)({
          images,
          startPosition: imageFiles.indexOf(item),
          onClose: onClosePreview
        }, props.previewOptions));
      }
    };
    const closeImagePreview = () => {
      if (imagePreview) {
        imagePreview.close();
      }
    };
    const deleteFile = (item, index) => {
      const fileList = props.modelValue.slice(0);
      fileList.splice(index, 1);
      emit("update:modelValue", fileList);
      emit("delete", item, getDetail(index));
    };
    const reuploadFile = (index) => {
      isReuploading.value = true;
      reuploadIndex.value = index;
      (0, import_vue.nextTick)(() => chooseFile());
    };
    const onInputClick = () => {
      if (!isReuploading.value) {
        reuploadIndex.value = -1;
      }
      isReuploading.value = false;
    };
    const renderPreviewItem = (item, index) => {
      const needPickData = ["imageFit", "deletable", "reupload", "previewSize", "beforeDelete"];
      const previewData = (0, import_utils.extend)((0, import_utils.pick)(props, needPickData), (0, import_utils.pick)(item, needPickData, true));
      return (0, import_vue.createVNode)(import_UploaderPreviewItem.default, (0, import_vue.mergeProps)({
        "item": item,
        "index": index,
        "onClick": () => emit(props.reupload ? "clickReupload" : "clickPreview", item, getDetail(index)),
        "onDelete": () => deleteFile(item, index),
        "onPreview": () => previewImage(item),
        "onReupload": () => reuploadFile(index)
      }, (0, import_utils.pick)(props, ["name", "lazyLoad"]), previewData), (0, import_utils.pick)(slots, ["preview-cover", "preview-delete"]));
    };
    const renderPreviewList = () => {
      if (props.previewImage) {
        return props.modelValue.map(renderPreviewItem);
      }
    };
    const onClickUpload = (event) => emit("clickUpload", event);
    const renderUpload = () => {
      const lessThanMax = props.modelValue.length < +props.maxCount;
      const Input = props.readonly ? null : (0, import_vue.createVNode)("input", {
        "ref": inputRef,
        "type": "file",
        "class": (0, import_utils2.bem)("input"),
        "accept": props.accept,
        "capture": props.capture,
        "multiple": props.multiple && reuploadIndex.value === -1,
        "disabled": props.disabled,
        "onChange": onChange,
        "onClick": onInputClick
      }, null);
      if (slots.default) {
        return (0, import_vue.withDirectives)((0, import_vue.createVNode)("div", {
          "class": (0, import_utils2.bem)("input-wrapper"),
          "onClick": onClickUpload
        }, [slots.default(), Input]), [[import_vue.vShow, lessThanMax]]);
      }
      return (0, import_vue.withDirectives)((0, import_vue.createVNode)("div", {
        "class": (0, import_utils2.bem)("upload", {
          readonly: props.readonly
        }),
        "style": (0, import_utils.getSizeStyle)(props.previewSize),
        "onClick": onClickUpload
      }, [(0, import_vue.createVNode)(import_icon.Icon, {
        "name": props.uploadIcon,
        "class": (0, import_utils2.bem)("upload-icon")
      }, null), props.uploadText && (0, import_vue.createVNode)("span", {
        "class": (0, import_utils2.bem)("upload-text")
      }, [props.uploadText]), Input]), [[import_vue.vShow, props.showUpload && lessThanMax]]);
    };
    const chooseFile = () => {
      if (inputRef.value && !props.disabled) {
        inputRef.value.click();
      }
    };
    (0, import_vue.onBeforeUnmount)(() => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    });
    (0, import_use_expose.useExpose)({
      chooseFile,
      reuploadFile,
      closeImagePreview
    });
    (0, import_use.useCustomFieldValue)(() => props.modelValue);
    return () => (0, import_vue.createVNode)("div", {
      "class": (0, import_utils2.bem)()
    }, [(0, import_vue.createVNode)("div", {
      "class": (0, import_utils2.bem)("wrapper", {
        disabled: props.disabled
      })
    }, [renderPreviewList(), renderUpload()])]);
  }
});
