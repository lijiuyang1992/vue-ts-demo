/*
 * @Author: 九阳
 * @Date: 2021-11-16 09:51:34
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 10:46:16
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
      {
        path: "/d3Test",
        name: "d3Test",
        component: () => import("../views/d3/d3Test.vue"),
        meta: {
          title: "d3图表",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/d3Interval",
        name: "d3Interval",
        component: () => import("../views/d3/d3Interval.vue"),
        meta: {
          title: "d3柱状图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/d3Pie",
        name: "d3Pie",
        component: () => import("../views/d3/d3Pie.vue"),
        meta: {
          title: "d3饼图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/d3Smooth",
        name: "d3Smooth",
        component: () => import("../views/d3/d3Smooth.vue"),
        meta: {
          title: "平滑缩放",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/d3Canvas",
        name: "d3Canvas",
        component: () => import("../views/d3/d3Canvas.vue"),
        meta: {
          title: "正交到等矩形",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/d3Bar",
        name: "d3Bar",
        component: () => import("../views/d3/d3Bar.vue"),
        meta: {
          title: "柱状图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
      {
        path: "/d3Clock",
        name: "d3Clock",
        component: () => import("../views/d3/d3Clock.vue"),
        meta: {
          title: "时钟",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/inTerval",
        name: "inTerval",
        component: () => import("../views/d3inTerval/inTerval01.vue"),
        meta: {
          title: "柱状图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/3dChart",
        name: "3dChart",
        component: () => import("../views/d3inTerval/3dChart.vue"),
        meta: {
          title: "3D立体",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/brokenLine",
        name: "brokenLine",
        component: () => import("../views/d3inTerval/brokenLine.vue"),
        meta: {
          title: "折线图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/area",
        name: "area",
        component: () => import("../views/d3inTerval/d3Area.vue"),
        meta: {
          title: "面积",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/pie",
        name: "pie",
        component: () => import("../views/d3inTerval/d3pie.vue"),
        meta: {
          title: "饼状图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/polar",
        name: "polar",
        component: () => import("../views/d3inTerval/d3Polar.vue"),
        meta: {
          title: "极地图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/radar",
        name: "radar",
        component: () => import("../views/d3inTerval/d3Radar.vue"),
        meta: {
          title: "雷达图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },

      {
        path: "/wave",
        name: "wave",
        component: () => import("../views/d3inTerval/d3wave.vue"),
        meta: {
          title: "水波图",
          icon: "home-4-line",
          keepAlive: true,
        },
      },
    ],
  },

  {
    path: "/dataV01",
    name: "dataV01",
    component: () => import("../views/datav/datav01.vue"),
    meta: {
      title: "大屏布局案例",
      icon: "home-4-line",
      keepAlive: true,
    },
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
