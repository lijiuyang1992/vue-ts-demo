<!--
 * @Author: 九阳
 * @Date: 2021-11-17 15:46:53
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 10:51:44
-->
<template>
  <a-layout-content
    :style="{
      margin: '24px 16px',
      padding: '24px',
      background: '#fff',
      minHeight: '280px',
    }"
  >
    <a-config-provider :locale="zhCN">
      <transition>
        <router-view></router-view>
      </transition>
    </a-config-provider>
  </a-layout-content>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
export default defineComponent({
  components: {},
  setup() {
    return {
      zhCN,
    };
  },
});
</script>
<style></style>
