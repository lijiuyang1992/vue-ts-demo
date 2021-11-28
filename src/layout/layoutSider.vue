<!--
 * @Author: 九阳
 * @Date: 2021-11-19 17:06:46
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 16:17:09
-->
<template>
  <a-layout-sider
    theme="light"
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
  >
    <div class="logo">VUE3框架</div>
    <a-menu v-model:selectedKeys="selectedKeys" mode="inline">
      <template v-for="menu in menuItem">
        <a-menu-item v-if="menu['node']" :key="menu['name']">
          <router-link :to="menu['path']" @click="routeItem(menu)">
            <HomeOutlined />
            <span>{{ menu["meta"]["title"] }}</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu v-if="!menu['node']" :key="menu['name']">
          <template #title>
            <icon-font :type="menu['meta']['icon']" />
            <span>
              {{ menu["meta"]["title"] }}
            </span>
          </template>
          <a-menu-item v-for="item in menu['children']" :key="item['name']">
            <router-link :to="item['path']" @click="routeItem2(menu, item)">
              <span>{{ item["meta"]["title"] }}</span>
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </template>
    </a-menu>
  </a-layout-sider>
</template>
<script lang="ts">
import { HomeOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref, reactive, toRefs, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Storage } from "@/store/storage";
import menuItems from "./menuData";
import IconFont from "@/components/IconFont.tsx";

export default defineComponent({
  components: {
    HomeOutlined,
    IconFont,
  },
  setup() {
    const currentRoute = useRoute();
    let pathName = String(currentRoute.name);
    const selectedKeys = ref<string[]>([pathName]);
    const $router = useRouter();
    const menuItem = menuItems;
    const clickMenuItem = (keyPath: string) => {
      if (/http(s)?:/.test(keyPath)) {
        window.open(keyPath);
      } else {
        $router.push(keyPath);
      }
    };
    const routeItem = (item: any) => {
      Storage.set("routeLinke", [item]);
    };
    const routeItem2 = (item: any, item1: any) => {
      Storage.set("routeLinke", [item, item1]);
    };
    // 跟随页面路由变化，切换菜单选中状态
    watch(
      () => currentRoute.fullPath,
      () => {
        if (currentRoute.name === "login") {
          return;
        }
        const name = String(currentRoute.name);
        selectedKeys.value = [name];
      }
    );
    return {
      selectedKeys,
      collapsed: ref<boolean>(false),
      clickMenuItem,
      routeItem2,
      routeItem,
      menuItem,
    };
  },
});
</script>
<style>
.logo {
  height: 32px;
  background: #1890ff;
  color: #fff;
  margin: 16px;
  padding: 2px;
  font-size: 20px;
  text-align: center;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
