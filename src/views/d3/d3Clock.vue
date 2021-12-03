<!--
 * @Author: 李九阳
 * @Date: 2021-12-01 12:36:59
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-01 12:38:15
-->
<!--
 * @Author: 李九阳
 * @Date: 2021-11-30 08:54:01
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 09:46:44
-->
<template>
  <div id="divClock"></div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { clock } from "@/chart/d3/clock.ts";
import * as d3 from "d3";
export default defineComponent({
  name: "d3Clock",
  setup() {
    onMounted(() => {
      clock();
    });
    return {};
  },
});
</script>
<style scoped></style>
