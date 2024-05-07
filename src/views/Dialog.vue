<template>
  <el-row>
    <el-button type="primary" @click="show('dialog-1')">显示弹框一</el-button>
    <el-button type="primary" @click="close('dialog-1')">隐藏弹框一</el-button>
    <el-button type="primary" @click="show('dialog-2')">显示弹框二</el-button>
    <el-button type="primary" @click="close('dialog-2')">隐藏弹框二</el-button>
    <el-button type="primary" @click="closeAll">隐藏弹框所有</el-button>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CsContent from "@/components/CsContent.vue";
import { CsDialogComponent } from "@/components/CsDialog";

@Component({
  components: {
    CsContent,
  },
})
export default class Dialog extends Vue {
  vmMap?: Map<string, CsDialogComponent> | undefined;

  show(key: string): void {
    if (this.vmMap?.get(key)) {
      return;
    }

    console.log("show", key);

    const h = this.$createElement;
    const options = {
      title: `标题 ${key}`,
      width: "15%",
      closeOnClickModal: false,
      beforeClose(done: () => void) {
        console.log("beforeClose");
        done();
      },
      onOpen() {
        console.log("open");
      },
      onOpened() {
        console.log("opened");
      },
      onClose() {
        console.log("close");
      },
      onClosed() {
        console.log("closed");
      },
      $slots: {
        default: h("cs-content", {
          ref: "cs-content",
          on: {
            submit: (data: { content: string }) => {
              console.log(data);
            },
          },
        }),
      },
    };

    const vm = this.$dialog(options);

    if (!this.vmMap) {
      this.vmMap = new Map<string, CsDialogComponent>();
    }

    this.vmMap.set(key, vm);
  }

  close(key: string): void {
    this.vmMap?.get(key)?.close();
    this.vmMap?.delete(key);
  }

  closeAll(): void {
    this.$dialog.closeAll();
    this.vmMap?.clear();
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-button {
  position: relative;
  z-index: 5000;
}
</style>
