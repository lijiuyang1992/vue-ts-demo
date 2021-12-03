<!--
 * @Author: 九阳
 * @Date: 2021-11-19 16:39:59
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-29 20:27:15
-->
<template>
  <a-layout-header style="background: #fff; padding: 0">
    <div>
      <span
        class="layout-header-trigger"
        @click="() => $emit('update:collapsed', !collapsed)"
      >
        <component
          :is="collapsed ? 'menu-unfold-outlined' : 'menu-fold-outlined'"
        />
      </span>
      <a-breadcrumb class="layout-header-breadcrumb">
        <template v-for="menu in pathName" :key="menu['name']">
          <a-breadcrumb-item>{{ menu["meta"]["title"] }}</a-breadcrumb-item>
        </template>
      </a-breadcrumb>
    </div>

    <a-dropdown class="layout-header-user">
      <div @click.prevent>
        <img class="layout-img" src="~@/assets/images/avatar-man.svg" />
        <div class="layout-user-class">
          <div class="layout-header-user-name">
            {{ loginUser.name || "用户名" }}
          </div>
        </div>
        <div class="layout-user-class">
          <div class="layout-header-login">
            {{ loginUser.jobNo || "工号" }}
          </div>
        </div>
      </div>
      <template #overlay>
        <div>
          <div class="layout-title-content">
            <img
              class="layout-content-img"
              src="~@/assets/images/avatar-man.svg"
            />
            <div class="layout-title-user">
              {{ loginUser.userName || "用户名" }}
            </div>
          </div>
          <a-button
            class="layout-popover-btn"
            style="border-color: transparent"
            nzType="text"
            >修改密码</a-button
          >
          <a-button
            class="layout-popover-btn"
            style="border-color: transparent"
            nzType="text"
            @click="logonOut"
            >退出</a-button
          >
          <!-- <a-button
            class="layout-popover-btn"
            style="border-color: transparent"
            nzType="text"
            @click="logonOut"
            >清除缓存</a-button
          > -->
        </div>
      </template>
    </a-dropdown>
  </a-layout-header>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from "vue";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { removeToken } from "@/http/cookie";
import { Storage } from "@/store/storage";
export default defineComponent({
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  props: {
    collapsed: {
      type: Boolean,
    },
  },
  emits: ["update:collapsed"],
  setup() {
    const currentRoute = useRoute();
    const pathRoute = Storage.get("routeLinke");
    const loginUser = Storage.get("userInfo");
    const router = useRouter();
    const state = reactive({
      loginUser,
      pathName: [
        {
          path: "/home",
          name: "home",
          node: true,
          meta: {
            title: "首页",
            icon: "home-4-line",
            keepAlive: true,
          },
        },
      ],
    });
    if (pathRoute !== undefined && pathRoute !== null) {
      if (String(currentRoute.name) !== "home") {
        state.pathName = pathRoute;
      }
    }
    const logonOut = () => {
      Storage.clear();
      removeToken();
      router
        .replace({
          path: "login",
        })
        .finally();
    };
    watch(
      () => currentRoute.fullPath,
      () => {
        const pathRoute = Storage.get("routeLinke");
        if (pathRoute !== undefined && pathRoute !== null) {
          state.pathName = pathRoute;
        }
      }
    );
    return {
      logonOut,
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.layout-header-trigger {
  float: left;
  font-size: 18px;
  line-height: 64px;
  padding-left: 12px;
  padding-right: 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.layout-header-trigger:hover {
  color: #1890ff;
}
.layout-header-breadcrumb {
  float: left;
  cursor: pointer;
  transition: color 0.3s;
}
:deep(.ant-breadcrumb) {
  line-height: 64px;
}

.layout-header-user {
  float: right;
}

.layout-header-user-name {
  display: block;
  margin-left: 7px;
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  color: #2e394a;
  text-align: left;
}

.layout-header-login {
  display: block;
  margin-right: 26px;
  margin-left: 8px;
  font-size: 10px;
  font-weight: 400;
  line-height: 12px;
  color: #a5aab3;
  text-align: left;
}

.layout-user-class {
  position: relative;
  bottom: -1px;
  display: inline-block;
}
.layout-img {
  height: 30px;
  width: 30px;
}
.layout-content-img {
  height: 48px;
  width: 48px;
}
.layout-title-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 125px;
  background-image: url("~@/assets/images/personal.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.layout-title-user {
  padding: unset;
  margin-top: 8px;
  font-weight: 400;
  line-height: 22px;
  color: #fff;
}
.layout-popover-btn {
  // padding: 10px 0;
  font-weight: 400;
  // height: 20px;
  color: #5d5d5d;
  text-align: center;
  width: 100%;
}
</style>
