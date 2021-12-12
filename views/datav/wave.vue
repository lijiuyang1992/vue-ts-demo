<!--
 * @Author: 李九阳
 * @Date: 2021-12-10 15:38:17
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 16:40:27
-->
<!--
 * @Author: 李九阳
 * @Date: 2021-12-10 14:36:24
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 14:39:52
-->
<template>
  <svg id="waveD3Chart"></svg>
</template>

<script lang="ts">
import * as d3 from "d3";
import { defineComponent, onMounted, ref, nextTick } from "vue";
import { waveD3Chart } from "./chartData";
export default defineComponent({
  name: "waveD3Chart",
  setup() {
    onMounted(() => {
      waveD3Chart();
    });
    return {};
  },
});
</script>
<style lang="scss">
</style>
