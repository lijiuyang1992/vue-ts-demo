<!--
 * @Author: 李九阳
 * @Date: 2021-12-07 17:03:30
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-08 14:06:38
-->
<template>
  <a-row :gutter="24">
    <a-col class="gutter-row" :span="24">
      <a-card title="极地图" :bordered="false" class="chart-card">
        <div id="d3Polar10"></div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { d3Polar } from "@/chart/d3/polar.ts";
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
    onMounted(() => {
      d3Polar();
    });
    return {};
  },
});
</script>
<style lang="scss">
#d3Polar10 {
  .frame {
    fill: none;
    stroke: #000;
  }

  .axis text {
    font: 10px sans-serif;
  }

  .axis line,
  .axis circle {
    fill: none;
    stroke: steelblue;
    stroke-dasharray: 4;
  }

  .axis:last-of-type circle {
    stroke: steelblue;
    stroke-dasharray: none;
  }

  .line {
    fill: none;
    stroke: orange;
    stroke-width: 3px;
  }
}
</style>
