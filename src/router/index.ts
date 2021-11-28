/*
 * @Author: 九阳
 * @Date: 2021-11-16 09:51:34
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 14:37:35
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../layout/layout.vue";
import { App } from "vue";
import { createRouterGuards } from "./router-guards";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: {
      title: "首页3",
      icon: "home-4-line",
      keepAlive: true,
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
          title: "首页2",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
        meta: {
          title: "首页1",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/test",
        name: "Test",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/Test.vue"),
        meta: {
          title: "测试",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/table",
        name: "Table",
        component: () => import("../views/table/table.vue"),
        meta: {
          title: "表格",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/tableTest",
        name: "TableTest",
        component: () => import("../views/table/tableTest.vue"),
        meta: {
          title: "表格01",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/testTable",
        name: "TestTable",
        component: () => import("../views/table/testTable.vue"),
        meta: {
          title: "表格02",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/form",
        name: "Form",
        component: () => import("../views/form/form.vue"),
        meta: {
          title: "表单",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/testForm",
        name: "TestForm",
        component: () => import("../views/form/testForm.vue"),
        meta: {
          title: "测试表单",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/infoForm",
        name: "InfoForm",
        component: () => import("../views/form/infoForm.vue"),
        meta: {
          title: "详情表单",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/listForm",
        name: "ListForm",
        component: () => import("../views/listForm/listForm.vue"),
        meta: {
          title: "动态增减表单项",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: import("@/views/login/login.vue"),
    meta: {
      title: "登录",
      icon: "",
      keepAlive: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}
export default router;
