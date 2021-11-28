<!--
 * @Author: 九阳
 * @Date: 2021-11-26 13:55:26
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 17:04:42
-->
<template>
  <vueForms
    ref="formRef"
    :formField="formField"
    :formData="formData"
  ></vueForms>
  <div style="text-align: center">
    <a-button type="primary" @click.prevent="onSubmit">保存</a-button>
    <a-button style="margin-left: 10px" @click="resetFields">取消</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { createVNode } from "vue";
import { Storage } from "@/store/storage";
import { vueForm } from "./formType";

export default defineComponent({
  setup() {
    const formData = ref({});
    const formRef = ref();
    const formField = ref(vueForm);
    const onSubmit = () => {
      formRef.value.validateForm();
      console.log(formRef.value.objectData);
    };
    const resetFields = () => {
      formRef.value.resetForm();
    };
    return {
      formRef,
      formField,
      onSubmit,
      resetFields,
      formData,
    };
  },
});
</script>
<style></style>
