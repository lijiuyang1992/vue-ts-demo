<!--
 * @Author: 九阳
 * @Date: 2021-11-17 15:46:53
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 15:36:24
-->
<template>
  <a-layout style="min-height: 100vh">
    <layoutSider v-model:collapsed="collapsed" />
    <a-layout>
      <layoutHeader v-model:collapsed="collapsed" />
      <layoutContent />
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { Storage } from "@/store/storage";
import menuItems from "./menuData";
import IconFont from "@/components/IconFont.tsx";
import layoutHeader from "./layoutHeader.vue";
import layoutSider from "./layoutSider.vue";
import layoutContent from "./layoutContent.vue";
export default defineComponent({
  components: {
    layoutHeader,
    layoutSider,
    layoutContent,
  },
  setup() {
    const $router = useRouter();
    const menuItem = menuItems;

    const clickMenuItem = (keyPath: string) => {
      if (/http(s)?:/.test(keyPath)) {
        window.open(keyPath);
      } else {
        $router.push(keyPath);
      }
    };
    const routeStorage = (keyPath: string) => {
      console.log($router.getRoutes());
      const path = Storage.get("routeLinke");
      if (path !== undefined && path !== null) {
        const list = path;
        if (!getList(keyPath, list)) {
          list.push(keyPath);
        }
        Storage.set("routeLinke", list);
      } else {
        Storage.set("routeLinke", [keyPath]);
      }
    };
    const getList = (key: string, list: []) => {
      for (const value of list) {
        if (key === value["path"]) {
          return true;
        }
      }
      return false;
    };
    return {
      selectedKeys: ref<string[]>(["1"]),
      collapsed: ref<boolean>(false),
      clickMenuItem,
      routeStorage,
      menuItem,
    };
  },
});
</script>
<style>
/* .trigger {
  float: left;
  font-size: 18px;
  line-height: 64px;
  padding: 24px;
  line-height: 24px;
  padding: 20px, 24px;
  cursor: pointer;
  transition: color 0.3s;
} */

/* .trigger:hover {
  color: #1890ff;
}

.logo {
  height: 32px;
  background: #1890ff;
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
} */
</style>
