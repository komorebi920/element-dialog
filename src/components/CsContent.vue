<template>
  <el-row>
    <cs-dialog-body>
      <el-form ref="form" :model="formData" :rules="formRules">
        <el-form-item label="内容1" prop="content">
          <el-input v-model="formData.content" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
    </cs-dialog-body>
    <cs-dialog-footer>
      <el-button @click="submit">提交</el-button>
    </cs-dialog-footer>
  </el-row>
</template>

<script lang="ts">
import { ElForm } from "element-ui/types/form";
import { Component, Vue } from "vue-property-decorator";
import { CsDialogBody, CsDialogFooter } from "@/components/CsDialog";

@Component({ components: { CsDialogBody, CsDialogFooter } })
export default class CsContent extends Vue {
  formData = {
    content: "",
  };

  formRules = {
    content: [
      {
        required: true,
        message: "请输入内容",
        trigger: "blur",
      },
    ],
  };

  submit(evt: Event): void {
    evt.preventDefault();

    const form = this.$refs.form as ElForm;

    form.validate((valid) => {
      if (valid) {
        // 提交表单
        this.$emit("submit", this.formData);
      }
    });
  }
}
</script>

<style lang="scss" scoped></style>
