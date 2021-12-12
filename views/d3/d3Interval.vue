<!--
 * @Author: 李九阳
 * @Date: 2021-11-29 14:57:23
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 09:21:33
-->

<template>
  <div id="d3Selector"></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { vueD3Interval } from "@/chart/d3/d3.ts";
import * as d3 from "d3";
export default defineComponent({
  name: "d3Interval",
  setup() {
    onMounted(() => {
      vueD3Interval();
    });
    return {};
  },
});
</script>
<style lang="scss" scoped>
#container {
  width: 800px;
  height: 500px;
  background: #333;
  margin: 0 auto;
}
svg {
  background: #fff;
  margin: 50px 100px;
}
.axis path,
.axis line {
  fill: none;
  stroke: black;
  shape-rendering: crispEdges;
}
.axis text {
  font-family: "Microsoft YaHei";
  font-size: 12px;
}
.myrect {
  fill: aqua;
}
</style>
