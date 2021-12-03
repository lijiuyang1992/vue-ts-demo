<!--
 * @Author: 李九阳
 * @Date: 2021-11-29 11:10:42
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 09:21:49
-->
<template>
  <div id="d3Selector"><svg width="960" height="600"></svg></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { vueD3Circle } from "@/chart/d3/d3.ts";
import * as d3 from "d3";
export default defineComponent({
  name: "d3Test",
  setup() {
    onMounted(() => {
      vueD3Circle();
    });
    return {};
  },
});
</script>
<style scoped>
svg {
  border: 1px solid #ccc;
}
.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}
.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}
</style>
