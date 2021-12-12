<!--
 * @Author: 九阳
 * @Date: 2021-11-16 09:51:34
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-04 18:05:58
-->
<template>
  <a-row :gutter="24">
    <a-col class="gutter-row" :span="12">
      <a-card title="折线图" :bordered="false" class="chart-card">
        <div id="chartLineDiv"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="12">
      <a-card title="柱状图" :bordered="false" class="chart-card">
        <div id="chartIntervalDiv"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="12">
      <a-card title="条形图" :bordered="false" class="chart-card">
        <div id="chartStripDiv"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="12">
      <a-card title="饼图" :bordered="false" class="chart-card">
        <div id="chartPieDiv"></div>
      </a-card>
    </a-col>

    <a-col class="gutter-row" :span="12">
      <a-card title="面积图" :bordered="false" class="chart-card">
        <div id="chartAreaDiv"></div>
      </a-card>
    </a-col>
    <a-col class="gutter-row" :span="12">
      <a-card title="雷达图" :bordered="false" class="chart-card">
        <div id="chartRadarDiv"></div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import {
  chartLine,
  chartStrip,
  chartRadar,
  chartArea,
  chartPie,
  chartInterval,
} from "@/chart/g2/chart.ts";

export default defineComponent({
  setup() {
    onMounted(() => {
      chartLine();
      chartStrip();
      chartRadar();
      chartArea();
      chartPie();
      chartInterval();
      const e = document.createEvent("Event");
      e.initEvent("resize", true, true);
      window.dispatchEvent(e);
    });
    return {};
  },
});
</script>
<style lang="scss" scoped>
.gutter-example :deep(.ant-row > div) {
  background: transparent;
  border: 0;
}
.gutter-box {
  padding: 5px 0;
}
.chart-card {
  height: 400px;
  padding: 5px 0;
}
</style>
