<!--
 * @Author: 李九阳
 * @Date: 2021-12-02 10:05:42
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-02 10:26:23
-->
<template>
  <a-row :gutter="24">
    <a-col class="gutter-row" :span="24">
      <a-card title="单柱状图" :bordered="false" class="chart-card">
        <div id="d3Interval10"></div>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import { interval10 } from "@/chart/d3/interval.ts";
export default defineComponent({
  name: "inTerval",
  setup() {
    onMounted(() => {
      interval10();
    });
    return {};
  },
});
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

div.tip-hill-div {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-family: Microsoft Yahei;
}

div.tip-hill-div > h1 {
  font-size: 14px;
}

div.tip-hill-div > h2 {
  font-size: 12px;
}
</style>
