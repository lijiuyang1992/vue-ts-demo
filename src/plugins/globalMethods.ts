/*
 * @Author: 九阳
 * @Date: 2021-11-20 10:24:33
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 10:34:47
 */
import { App } from "vue";
import axiosPlugin from "@/http/axios.ts";

// import hasPermission from '@/utils/permission/hasPermission'

/**
 * 注册全局方法
 * @param app
 */
export function setupGlobalMethods(app: App) {
  // app.use(hasPermission)
  app.use(axiosPlugin);
}
