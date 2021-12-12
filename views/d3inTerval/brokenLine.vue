<!--
 * @Author: 李九阳
 * @Date: 2021-12-02 20:29:29
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-07 15:05:58
-->
<template>
  <a-row :gutter="24">
    <a-col class="gutter-row" :span="24">
      <a-card title="动画折线图" :bordered="false" class="chart-card">
        <div id="d3Line100"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="24">
      <a-card title="动画折线图2" :bordered="false" class="chart-card">
        <div id="d3Line102"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="24">
      <a-card title="折线图" :bordered="false" class="chart-card">
        <div id="d3Line10"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="24">
      <a-card title="多折线图" :bordered="false" class="chart-card">
        <div id="d3Line11"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="24">
      <a-card title="曲线图" :bordered="false" class="chart-card">
        <div id="d3Line12"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="24">
      <a-card title="多曲线图" :bordered="false" class="chart-card">
        <div id="d3BrokenLine04"></div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import {
  brokenLine01,
  brokenLine02,
  brokenLine03,
  brokenLine04,
  line100,
  line102,
} from "@/chart/d3/brokenLine.ts";
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
      paddingLeft: 20,
      paddingRight: 10,
      paddingTop: 20,
      paddingBottom: 20,
    };
    onMounted(() => {
      brokenLine01(config, data);
      brokenLine02();
      brokenLine03(config11, data);
      brokenLine04(config);
      line100();
      line102();
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
