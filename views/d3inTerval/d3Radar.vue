<!--
 * @Author: 李九阳
 * @Date: 2021-12-08 13:39:21
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-09 15:36:10
-->
<template>
  <a-row :gutter="24" id="d3Radar">
    <a-col class="gutter-row" :span="24">
      <a-card title="雷达坐标轴" :bordered="false" class="chart-card">
        <div id="d3Radar01"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="24">
      <a-card title="雷达坐" :bordered="false" class="chart-card">
        <div id="d3Radar02"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="24">
      <a-card title="雷达坐标轴" :bordered="false" class="chart-card">
        <div id="radarChart02"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="24">
      <a-card title="雷达图" :bordered="false" class="chart-card">
        <div id="radarChart04"></div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import {
  radarChart,
  radarChart01,
  radarChart02,
  radarChart04,
} from "@/chart/d3/radar.ts";
export default defineComponent({
  name: "inTerval",
  setup() {
    const config = {
      select: "#d3Radar01",
      key: "key",
      value: "value",
      width: 710,
      height: 500,
      paddingLeft: 20,
      paddingRight: 10,
      paddingTop: 40,
      paddingBottom: 20,
    };
    const config02 = {
      select: "#d3Radar02",
      key: "key",
      value: "value",
      width: 710,
      height: 500,
      paddingLeft: 20,
      paddingRight: 10,
      paddingTop: 40,
      paddingBottom: 60,
    };
    onMounted(() => {
      radarChart(config);
      radarChart01(config02);
      radarChart02();
      radarChart04();
    });
    return {};
  },
});
</script>
<style lang="scss">
#d3Radar {
  .webs polygon {
    fill: white;
    fill-opacity: 0.5;
    stroke: gray;
    stroke-dasharray: 10 5;
  }
  .lines {
    fill: white;
    fill-opacity: 0.5;
    stroke: gray;
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
