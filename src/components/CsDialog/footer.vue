<template>
  <el-row class="cs-dialog__footer">
    <slot />
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CsDialogFooter extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/styles/element-variables.scss";

.cs-dialog__footer {
  padding: 10px 20px;
  text-align: right;
  box-sizing: border-box;
  border-top: 1px solid $--border-color-base;
}
</style>
