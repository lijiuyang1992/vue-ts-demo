<!--
 * @Author: 九阳
 * @Date: 2021-11-27 09:37:16
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-27 10:04:28
-->
<template>
  <vueForms
    ref="formRef"
    :isEdit="isEdit"
    :formField="formField"
    :formData="formData"
  ></vueForms>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { createVNode } from "vue";
import { Storage } from "@/store/storage";
import { vueForm } from "./formType";

export default defineComponent({
  setup() {
    const formRef = ref();
    const isEdit = ref(false);
    const formField = ref(vueForm);
    let formData = {
      input: "姓名",
      date: "2021-11-27",
      month: "2021-11",
      week: "",
      dateTime: "2021-11-27 12:12:12",
      range01: "2021-11-27",
      range02: "2021-11-30",
      rangeTime01: "2021-11-27 12:12:12",
      rangeTime02: "2021-11-30 01:12:12",
      select: "0",
      multiple: "010,021",
      tags: "025,010",
      checkbox: "0,1",
      radio: "0",
      "button-solid": "1",
      "button-outline": "1",
    };
    return {
      formRef,
      isEdit,
      formField,
      formData,
    };
  },
});
</script>
<style></style>
