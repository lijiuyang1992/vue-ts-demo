<!--
 * @Author: 李九阳
 * @Date: 2021-12-10 15:38:17
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 16:38:11
-->
<!--
 * @Author: 李九阳
 * @Date: 2021-12-10 14:36:24
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 14:39:52
-->
<template>
  <svg id="d3PieChart01"></svg>
</template>

<script lang="ts">
import * as d3 from "d3";
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { linePie } from "./chartData";
export default defineComponent({
  name: "pieChart01",
  setup() {
    onMounted(() => {
      linePie();
    });
    return {};
  },
});
</script>
<style lang="scss">
#d3PieChart01 {
  .webs polygon {
    fill: white;
    fill-opacity: 0.5;
    stroke: gray;
    stroke-dasharray: 10 5;
  }
  .lines {
    fill: white;
    fill-opacity: 0.5;
    // stroke: gray;
    stroke-width: 5;
    stroke-dasharray: 10 5;
  }
  .areas polygon {
    fill-opacity: 0.5;
    stroke-width: 3;
  }
  .areas circle {
    fill: white;
    stroke-width: 3;
  }
}
</style>
