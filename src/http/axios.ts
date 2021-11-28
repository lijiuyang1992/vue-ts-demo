/*
 * @Author: 九阳
 * @Date: 2021-11-28 10:33:04
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 10:33:06
 */
import { App } from "vue";
import http from "../http";
import { AxiosInstance } from "axios";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios?: AxiosInstance;
  }
}

export const axiosPlugin = {
  install(app: App): void {
    app.config.globalProperties.$axios = http;
  },
};

export default axiosPlugin;
