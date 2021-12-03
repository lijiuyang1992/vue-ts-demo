<!--
 * @Author: 李九阳
 * @Date: 2021-11-29 15:29:41
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 09:21:40
-->
<!--
 * @Author: 李九阳
 * @Date: 2021-11-29 15:29:27
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-29 15:29:29
-->

<template>
  <div class="d3Selector"></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { vueD3Pie } from "@/chart/d3/d3.ts";
import * as d3 from "d3";
export default defineComponent({
  name: "d3Pie",
  setup() {
    onMounted(() => {
      vueD3Pie();
    });
    return {};
  },
});
</script>
<style scoped></style>
