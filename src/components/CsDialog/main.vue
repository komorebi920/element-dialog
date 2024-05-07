<template>
  <el-dialog
    :visible.sync="visible"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :top="top"
    :modal="modal"
    :customClass="customClass ? `cs-dialog ${customClass}` : 'cs-dialog'"
    :closeOnClickModal="closeOnClickModal"
    :closeOnPressEscape="closeOnPressEscape"
    :showClose="showClose"
    :beforeClose="beforeClose"
    :center="center"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
  >
    <slot />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CsDialog extends Vue {
  visible = false;

  title?: string = "";

  width?: string = "50%";

  fullscreen?: boolean = false;

  top?: string = "15vh";

  modal?: boolean = true;

  customClass?: string = "";

  closeOnClickModal?: boolean = true;

  closeOnPressEscape?: boolean = true;

  showClose?: boolean = true;

  beforeClose? = (done: (...args: unknown[]) => unknown): void => {
    done();
  };

  center?: boolean = false;

  private destroyElement() {
    this.$el.removeEventListener("transitionend", this.destroyElement);
    this.$el.parentNode?.removeChild(this.$el);
    this.$destroy();
  }

  onOpen?: () => void;

  onOpened?: () => void;

  onClose?: () => void;

  onClosed?: () => void;

  open(): void {
    if (typeof this.onOpen === "function") this.onOpen();
  }

  opened(): void {
    if (typeof this.onOpened === "function") this.onOpened();
  }

  close(): void {
    if (this.visible) this.visible = false;
    if (typeof this.onClose === "function") this.onClose();
  }

  closed(): void {
    if (typeof this.onClosed === "function") this.onClosed();
    this.destroyElement();
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  .el-dialog__body {
    padding: 0;
  }
}
</style>
