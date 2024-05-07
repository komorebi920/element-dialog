import Main from "./main.vue";
import Vue, { VueConstructor } from "vue";
import { CsDialog, CsDialogOptions, CsDialogComponent } from "./types";
import { isVNode } from "@/utils";
import CsDialogBody from "./body.vue";
import CsDialogFooter from "./footer.vue";

export * from "./types";

const CsDialogConstructor = Vue.extend(Main);

let instance: CsDialogComponent;
const instances: CsDialogComponent[] = [];
let seed = 1;

/**
 * 显示弹框
 */
const _CsDialog: CsDialog = (options: CsDialogOptions) => {
  const payload = { ...options };

  const userOnClose = payload.onClose;
  const id = `cs-dialog-${seed++}`;

  payload.onClose = () => {
    _CsDialog.close(id, userOnClose);
  };

  const { $slots, ...data } = payload;

  instance = new CsDialogConstructor({ data });

  if ($slots?.title && isVNode($slots?.title)) {
    instance.$slots.title = [$slots?.title];
  } else {
    delete instance.$slots.title;
  }

  if ($slots?.default && isVNode($slots?.default)) {
    instance.$slots.default = [$slots?.default];
  } else {
    delete instance.$slots.default;
  }

  if ($slots?.footer && isVNode($slots?.footer)) {
    instance.$slots.footer = [$slots?.footer];
  } else {
    delete instance.$slots.footer;
  }

  instance.id = id;
  instance.$mount();
  document.body.appendChild(instance.$el);

  Vue.nextTick(() => {
    instance.visible = true;
  });

  instances.push(instance);

  return instance;
};

/**
 * 关闭弹框
 */
_CsDialog.close = (
  id: string,
  userOnClose?: (...args: unknown[]) => unknown
) => {
  let index = -1;

  const instance = instances.filter((instance, i) => {
    if (instance.id === id) {
      index = i;
      return true;
    }
    return false;
  })[0];

  if (!instance) return;
  if (typeof userOnClose === "function") {
    userOnClose(instance);
  }

  instances.splice(index, 1);
};

/**
 * 关闭所有弹框
 */
_CsDialog.closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

const install = (Vue: VueConstructor): void => {
  Vue.prototype.$dialog = _CsDialog;
};

export default { install };
export { CsDialogBody, CsDialogFooter };
