<!--
 * @Author: 李九阳
 * @Date: 2021-11-30 08:54:01
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 09:46:44
-->
<template>
  <div id="d3BarSelect"></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { vueBar } from "@/chart/d3/d3.ts";
import * as d3 from "d3";
export default defineComponent({
  name: "d3Bar",
  setup() {
    const config = {
      select: "#d3BarSelect",
      key: "key",
      value: "value",
      width: 710,
      height: 300,
      paddingLeft: 30,
      paddingRight: 20,
      paddingTop: 50,
      paddingBottom: 30,
    };
    const data = [
      {
        key: "aa",
        value: "32",
      },
      {
        key: "bb",
        value: "26",
      },
      {
        key: "cc",
        value: "45",
      },
      {
        key: "dd",
        value: "38",
      },
      {
        key: "ee",
        value: "53",
      },
      {
        key: "ff",
        value: "48",
      },
      {
        key: "gg",
        value: "42",
      },
    ];
    onMounted(() => {
      vueBar(config, data);
    });
    return {};
  },
});
</script>
<style scoped>
.selectBar {
  border: 1px solid #0b3536;
  border-radius: 6px;
  fill: #0098d8;
}
#d3BarSelect .barText {
  fill: #f5faf8;
  font-weight: 500;
}
.axisY text,
.axisX text,
.headerText text {
  fill: #0b3536;
}
#d3BarSelect svg {
  banckground-color: #f5faf8;
}
</style>
