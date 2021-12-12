<!--
 * @Author: 李九阳
 * @Date: 2021-12-10 15:38:17
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 16:38:14
-->
<template>
  <svg id="d3PieChart02"></svg>
</template>

<script lang="ts">
import * as d3 from "d3";
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { simplePieChart } from "./chartData";
export default defineComponent({
  name: "pieChart02",
  setup() {
    onMounted(() => {
      simplePieChart();
    });
    return {};
  },
});
</script>
<style lang="scss">
#d3PieChart02 {
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
