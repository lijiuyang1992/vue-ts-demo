<!--
 * @Author: 李九阳
 * @Date: 2021-12-03 13:44:15
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-08 14:06:28
-->
<!--
 * @Author: 李九阳
 * @Date: 2021-12-02 20:29:29
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-03 11:00:38
-->
<template>
  <a-row :gutter="24">
    <a-col class="gutter-row" :span="24">
      <a-card title="面积图" :bordered="false" class="chart-card">
        <svg
          id="#radialStackedBar02"
          width="960"
          height="960"
          font-family="sans-serif"
          font-size="10"
        ></svg>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { radialStackedBar02 } from "@/chart/d3/radialStackedBar.ts";
export default defineComponent({
  name: "inTerval",
  setup() {
    onMounted(() => {
      radialStackedBar02();
    });
    return {};
  },
});
</script>
<style lang="scss">
#d3Line11 {
  .grid .tick {
    stroke: lightgrey;
    opacity: 0.7;
    shape-rendering: crispEdges;
  }

  .grid path {
    stroke-width: 0;
  }

  .axis path {
    fill: none;
    stroke: #bbb;
    shape-rendering: crispEdges;
  }

  .axis text {
    fill: #555;
  }

  .axis line {
    stroke: #e7e7e7;
    shape-rendering: crispEdges;
  }

  .axis .axis-label {
    font-size: 14px;
  }

  .line {
    fill: none;
    stroke-width: 1.5px;
  }

  .dot {
    /* consider the stroke-with the mouse detect radius? */
    stroke: transparent;
    stroke-width: 10px;
    cursor: pointer;
  }

  .dot:hover {
    stroke: rgba(68, 127, 255, 0.3);
  }
}
</style>
