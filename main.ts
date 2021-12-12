/*
 * @Author: 九阳
 * @Date: 2021-11-16 09:51:34
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 09:36:07
 */
import { createApp } from "vue";
import App from "@/App.vue";
import router, { setupRouter } from "@/router";
import store from "@/store";
import "ant-design-vue/dist/antd.css";
import {
  setupAntd,
  setupDirectives,
  setupGlobalMethods,
  setupCustomComponents,
  setupExternal,
} from "@/plugins";

const app = createApp(App);
app.use(store);
// 非 typescript 插件类型引入
app.use(setupExternal);
// 注册全局常用的ant-design-vue组件
setupAntd(app);
// 注册全局自定义组件,如：<svg-icon />
setupCustomComponents(app);
// 注册全局自定义指令，如：v-permission权限指令
setupDirectives(app);
// 注册全局方法，如：app.config.globalProperties.$message = message
setupGlobalMethods(app);
// 挂载路由
setupRouter(app);
// 路由准备就绪后挂载APP实例
router.isReady().then(() => app.mount("#app"));
