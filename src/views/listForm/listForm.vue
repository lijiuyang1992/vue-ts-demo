<!--
 * @Author: 九阳
 * @Date: 2021-11-28 14:33:05
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 16:06:53
-->
<template>
  <vueListForms
    ref="formRef"
    :formField="formField"
    :ListData="listData"
  ></vueListForms>
  <div style="text-align: center">
    <a-button type="primary" @click.prevent="onSubmit">保存</a-button>
    <a-button style="margin-left: 10px" @click="resetFields">取消</a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { createVNode } from "vue";
import { Storage } from "@/store/storage";
import { vueForm } from "@/views/form/formType";

export default defineComponent({
  setup() {
    const formRef = ref();
    const formField = ref(vueForm);
    const listData = ref([]);
    const onSubmit = () => {
      formRef.value.validateForm();
    };
    const resetFields = () => {
      formRef.value.resetForm();
    };
    return {
      formRef,
      formField,
      listData,
      onSubmit,
      resetFields,
    };
  },
});
</script>
<style></style>
