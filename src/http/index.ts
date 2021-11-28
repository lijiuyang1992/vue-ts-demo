/*
 * @Author: 九阳
 * @Date: 2021-11-28 10:29:08
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 13:26:50
 */
import { AxiosPromise, AxiosResponse } from "axios";
import { Interceptors } from "./interceptors";

// 请求配置
export class HttpServer {
  // axios: any;
  // // 获取axios实例
  // constructor() {
  //   this.axios = new Interceptors().getInterceptors();
  // }
  // 简单封装一下方法
  request(config: any): AxiosPromise {
    const axios = Interceptors.init();
    return new Promise((resolve, reject) => {
      axios(config)
        .then((res: AxiosResponse) => {
          resolve(res);
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }
}

const http = new HttpServer();

export default http;
