<!--
 * @Author: 九阳
 * @Date: 2021-11-25 14:33:55
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-25 18:27:19
-->
<!--
 * @Author: 九阳
 * @Date: 2021-11-24 10:17:26
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-24 15:06:50
-->
<template>
  <span>{{ tableValue }}</span>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { Storage } from "@/store/storage";
import moment, { Moment } from "moment";
import { FormType } from "@/type/formType";

export default defineComponent({
  name: "VueFormSpan",
  props: {
    formField: {
      type: Object as PropType<FormType>,
      required: true,
    },
    dataVule: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    let tableValue = String(props["dataVule"]);
    // if (props["column"] !== undefined) {
    //   const vsCode = String(props["column"]["vsCode"]);
    //   const vsCodeList = Storage.get(vsCode);
    //   if (vsCodeList) {
    //     // 转换至
    //   }
    // }
    return {
      tableValue,
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
