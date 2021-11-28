<!--
 * @Author: 九阳
 * @Date: 2021-11-24 10:17:26
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-25 16:06:38
-->
<template>
  <span>{{ tableValue }}</span>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Storage } from "@/store/storage";
export default defineComponent({
  name: "VueSpan",
  props: {
    column: {
      type: Object,
      required: true,
    },
    dataVule: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    let tableValue = String(props["dataVule"]);
    if (props["column"] !== undefined) {
      const vsCode = String(props["column"]["vsCode"]);
      const vsCodeList = Storage.get(vsCode);
      if (vsCodeList) {
        // 转换至
        for (const key of vsCodeList) {
          if (props["dataVule"] === key.value) {
            tableValue = key.label;
          }
        }
      }
    }
    return {
      tableValue,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
