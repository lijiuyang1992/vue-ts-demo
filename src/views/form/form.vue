<!--
 * @Author: 九阳
 * @Date: 2021-11-25 15:28:06
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 17:02:48
-->
<template>
  <vue-form
    ref="formRef"
    :formField="formField"
    :formData="formData"
  ></vue-form>
  <div style="text-align: center">
    <a-button type="primary" @click.prevent="onSubmit">保存</a-button>
    <a-button style="margin-left: 10px" @click="resetFields">取消</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { createVNode } from "vue";
import { Storage } from "@/store/storage";
import { formColumns } from "./formType";

export default defineComponent({
  setup() {
    const formRef = ref();
    const formField = ref(formColumns);
    let formData = {
      input: "",
      date: "",
      year: "",
      month: "",
      week: "",
      dateTime: "",
      range01: "",
      range02: "",
      rangeTime01: "",
      rangeTime02: "",
      select: "",
      multiple: "",
      tags: "",
    };
    const emptyObject = JSON.parse(JSON.stringify(formData));
    const onSubmit = () => {
      formRef.value.validateForm();
      console.log(formRef.value.ObjectData);
    };
    const resetFields = () => {
      formData = JSON.parse(JSON.stringify(emptyObject));
      formRef.value.resetForm(formData);
    };
    return {
      formRef,
      formField,
      formData,
      onSubmit,
      resetFields,
    };
  },
});
</script>
<style></style>
