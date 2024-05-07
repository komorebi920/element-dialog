<template>
  <el-row class="cs-dialog__body">
    <slot />
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CsDialogBody extends Vue {}
</script>

<style lang="scss" scoped>
.cs-dialog__body {
  padding: 30px 20px;
}
</style>
