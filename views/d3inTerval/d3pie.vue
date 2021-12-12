<!--
 * @Author: 李九阳
 * @Date: 2021-12-06 13:58:50
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-08 20:26:46
-->
<template>
  <a-row :gutter="24">
    <a-col class="gutter-row" :span="24">
      <a-card title="甜甜圈1" :bordered="false" class="chart-card">
        <div id="d3pie01"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="24">
      <a-card title="动画效果甜甜圈" :bordered="false" class="chart-card">
        <div id="d3pie02"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="24">
      <a-card title="甜甜圈" :bordered="false" class="chart-card">
        <div id="d3pie10"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="24">
      <a-card title="3d饼图" :bordered="false" class="chart-card">
        <div id="simplePieChart12"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="24">
      <a-card title="齿轮饼图" :bordered="false" class="chart-card">
        <div id="d3LinePie"></div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import {
  simplePieChart01,
  simplePieChart,
  simplePieChart10,
  simplePieChart12,
  linePie,
} from "@/chart/d3/pie.ts";
export default defineComponent({
  name: "inTerval",
  setup() {
    const config = {
      select: "#d3pie10",
      key: "key",
      value: "value",
      width: 710,
      height: 500,
      paddingLeft: 20,
      paddingRight: 10,
      paddingTop: 20,
      paddingBottom: 20,
    };

    const config01 = {
      select: "#d3pie01",
      key: "key",
      value: "value",
      width: 710,
      height: 600,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 50,
      paddingBottom: 50,
    };
    const config02 = {
      select: "#d3pie02",
      key: "key",
      value: "value",
      width: 710,
      height: 600,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 50,
      paddingBottom: 50,
    };
    onMounted(() => {
      simplePieChart01(config);
      simplePieChart(config01);
      simplePieChart10(config02);
      simplePieChart12();
      linePie(config);
    });
    return {};
  },
});
</script>
<style lang="scss">
#d3LinePie {
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
