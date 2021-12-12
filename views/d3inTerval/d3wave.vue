<!--
 * @Author: 李九阳
 * @Date: 2021-12-06 14:46:54
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-09 13:31:57
-->
<!--
 * @Author: 李九阳
 * @Date: 2021-12-07 17:03:30
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-07 17:03:31
-->
<!--
 * @Author: 李九阳
 * @Date: 2021-12-06 13:58:50
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-06 14:53:01
-->
<template>
  <a-row :gutter="24">
    <a-col class="gutter-row" :span="24">
      <a-card title="水波图" :bordered="false" class="chart-card">
        <div id="waveD3Chart"></div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { waveD3Chart } from "@/chart/d3/wave.ts";
export default defineComponent({
  name: "inTerval",
  setup() {
    // const config = {
    //   select: "#d3pie10",
    //   key: "key",
    //   value: "value",
    //   width: 710,
    //   height: 500,
    //   paddingLeft: 20,
    //   paddingRight: 10,
    //   paddingTop: 20,
    //   paddingBottom: 20,
    // };
    onMounted(() => {
      waveD3Chart();
    });
    return {};
  },
});
</script>
<style scoped></style>
