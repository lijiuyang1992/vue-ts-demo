<!--
 * @Author: 九阳
 * @Date: 2021-11-17 15:46:53
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-25 09:12:09
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
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
  </a-layout-content>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  components: {},
  setup() {
    return {};
  },
});
</script>
<style></style>
