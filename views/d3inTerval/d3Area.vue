<!--
 * @Author: 李九阳
 * @Date: 2021-12-03 13:44:15
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-09 10:05:08
-->
<template>
  <a-row :gutter="24">
    <a-col class="gutter-row" :span="24">
      <a-card title="面积图" :bordered="false" class="chart-card">
        <div id="d3Area01"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="24">
      <a-card title="层叠面积图" :bordered="false" class="chart-card">
        <div id="d3Area02"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="24">
      <a-card title="地图面积图" :bordered="false" class="chart-card">
        <div id="d3Area04"></div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { d3Area, d3Area02, d3Area04 } from "@/chart/d3/area.ts";
export default defineComponent({
  name: "inTerval",
  setup() {
    const config = {
      select: "#d3Line10",
      key: "key",
      value: "value",
      width: 710,
      height: 400,
      paddingLeft: 20,
      paddingRight: 10,
      paddingTop: 20,
      paddingBottom: 20,
    };
    const data = [
      {
        key: "语文",
        value: "32",
      },
      {
        key: "数学",
        value: "26",
      },
      {
        key: "物理",
        value: "45",
      },
      {
        key: "英语",
        value: "38",
      },
      {
        key: "历史",
        value: "53",
      },
      {
        key: "化学",
        value: "48",
      },
      {
        key: "生物",
        value: "42",
      },
    ];

    const config11 = {
      select: "#d3Line12",
      key: "key",
      value: "value",
      width: 710,
      height: 400,
      paddingLeft: 40,
      paddingRight: 10,
      paddingTop: 20,
      paddingBottom: 20,
    };
    onMounted(() => {
      d3Area();
      d3Area02(config11);
      d3Area04(config11);
    });
    return {
      config,
      data,
    };
  },
});
</script>
<style lang="scss" scoped>
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
