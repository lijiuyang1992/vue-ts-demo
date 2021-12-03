<!--
 * @Author: 李九阳
 * @Date: 2021-11-29 16:09:29
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 09:21:45
-->
<template>
  <div></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { vueD3viewBox } from "@/chart/d3/d3.ts";
import * as d3 from "d3";
export default defineComponent({
  name: "d3viewBox",
  setup() {
    onMounted(() => {
      vueD3viewBox();
    });
    return {};
  },
});
</script>
<style scoped></style>
