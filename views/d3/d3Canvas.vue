<!--
 * @Author: 李九阳
 * @Date: 2021-11-29 16:39:50
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-01 09:30:17
-->
<template>
  <canvas id="myCanvas" width="1152" height="640"></canvas>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { vueD3Canvas } from "@/chart/d3/d3.ts";
import * as d3 from "d3";
export default defineComponent({
  name: "d3Canvas",
  setup() {
    onMounted(() => {
      vueD3Canvas();
    });
    return {};
  },
});
</script>
<style scoped></style>
