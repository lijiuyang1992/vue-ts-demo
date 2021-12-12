<!--
 * @Author: 李九阳
 * @Date: 2021-12-10 09:37:20
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 16:41:05
-->
<template>
  <dv-full-screen-container>
    <dv-border-box-11 title="数据可视化">
      <a-row
        :gutter="24"
        style="margin-left: 0; margin-right: 0; padding-top: 60px; row-gap: 0"
      >
        <a-col :span="6" style="width: 432px">
          <a-col :span="24" style="height: 250px">
            <dv-border-box-1>
              <pieChart01></pieChart01>
            </dv-border-box-1>
          </a-col>
          <a-col :span="24" style="height: 250px">
            <dv-border-box-1><pieChart02></pieChart02></dv-border-box-1>
          </a-col>
          <a-col :span="24" style="height: 250px">
            <dv-border-box-1>左边下</dv-border-box-1>
          </a-col>
        </a-col>
        <a-col
          class="gutter-row"
          :span="12"
          style="height: 750px; width: 936px"
        >
          <dv-border-box-12>
            <mapChart></mapChart>
          </dv-border-box-12>
        </a-col>
        <a-col :span="6" style="width: 432px">
          <a-col :span="24" style="height: 250px">
            <dv-border-box-1><waveD3Chart></waveD3Chart></dv-border-box-1>
          </a-col>
          <a-col :span="24" style="height: 250px">
            <dv-border-box-1>右边中</dv-border-box-1>
          </a-col>
          <a-col :span="24" style="height: 250px">
            <dv-border-box-1>右边下</dv-border-box-1>
          </a-col>
        </a-col>
      </a-row>
    </dv-border-box-11>
  </dv-full-screen-container>
</template>

<script lang="ts">
import mapChart from "./dataMap.vue";
import pieChart01 from "./pie01.vue";
import pieChart02 from "./pie02.vue";
import waveD3Chart from "./wave.vue";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
  components: {
    mapChart,
    pieChart01,
    pieChart02,
    waveD3Chart,
  },
  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.dava-row {
  margin-left: 0;
  margin-right: 0;
  padding-top: 60 px;
  height: 500 px;
  row-gap: 0 px;
}
</style>
