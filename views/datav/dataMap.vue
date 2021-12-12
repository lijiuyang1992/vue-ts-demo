<!--
 * @Author: 李九阳
 * @Date: 2021-12-10 14:36:24
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 14:39:52
-->
<template>
  <svg id="d3MapChart"></svg>
</template>

<script lang="ts">
import * as d3 from "d3";
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { d3MapChart } from "./mapData";
export default defineComponent({
  name: "mapChart",
  setup() {
    onMounted(() => {
      console.log("onMounted");
      d3MapChart();
      //   window.onresize = () => {
      //     return (() => {
      //       const davic = d3.select("#d3MapChart");
      //       console.log(davic);
      //       console.log("121212");
      //     })();
      //   };
    });
    return {};
  },
});
</script>
<style lang="scss" scoped></style>
