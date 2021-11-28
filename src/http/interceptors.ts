/*
 * @Author: 九阳
 * @Date: 2021-11-28 10:28:03
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 13:44:12
 */
// 首先引入axios和上一步封装的cookie方法
import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";
import {
  setToken,
  setRefreshToken,
  getToken,
  getTokenKey,
  getRefreshToken,
  getRefreshTokenKey,
  removeToken,
} from "./cookie";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
import { Storage } from "@/store/storage";
export class Interceptors {
  public static instance: AxiosInstance;
  constructor() {
    // this.instance = axios.create({
    //   baseURL: "/api",
    //   timeout: 10000,
    // });
  }
  public static init() {
    this.instance = axios.create({
      headers: {
        //php 的 post 传输请求头一定要这个 不然报错 接收不到值
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin-Type": "*",
      },
      // 请求时长
      timeout: 1000 * 30,
      // 请求的base地址 TODO:这块以后根据不同的模块调不同的api
      baseURL: process.env.VUE_APP_API_URL,
      //     ? "测试"
      //     : "正式",
      // 表示跨域请求时是否需要使用凭证
      withCredentials: false,
    });
    this.initIntercept();
    return this.instance;
  }
  // 初始化拦截器
  public static initIntercept() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        // 判断一下是否有cookie 如果有的话则把cookie放入请求头中
        if (getToken()) {
          config.headers[getTokenKey()] = getToken();
          config.headers[getRefreshTokenKey()] = getRefreshToken();
        }
        return config;
      },
      (err) => {
        console.error(err);
      }
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.data;
        if (!response.status.toString().startsWith("2") || res.code === -1) {
          // 如果状态码不是2开头或者接口code返回-1 则是返回错误信息
          console.error("系统错误，请检查API是否正常！");
          return;
        }
        if (res.code !== 0) {
          if (res.code === -3) {
            console.error("登录过期");
            removeToken();
          } else {
            if (res.msg) {
              console.error(res.msg);
            }
          }
          return Promise.resolve(res);
        } else {
          // 返回成功则把token存储一下
          const headers = response.headers;
          const token = headers.token;
          const refresh_token = headers["refresh-token"];
          if (token && refresh_token) {
            setToken(token);
            setRefreshToken(refresh_token);
          }
          return res;
        }
      },
      (error: any) => {
        // if (error.message === "Request failed with status code 500") {
        //   console.error("系统错误，请检查API是否正常！");
        //   return;
        // }
        // let code = -110;
        // if (error && error.response && error.response.status) {
        //   code = error.response.status;
        //   // 登陆过期
        //   if (code === 401 || code === -3) {
        //     removeToken();
        //   }
        // } else {
        //   console.error(error.message);
        // }
        const err = {
          errCode: error.response.status,
          errMsg: error.message || "Error",
        };
        this.errorHandle(error.response.status, error.message);
        return Promise.resolve(err);
      }
    );
  }
  // 返回一下
  // getInterceptors() {
  //   return this.instance;
  // }

  /**
   * 请求失败后的错误统一处理
   * @param {Number} status 请求失败的状态码
   */
  private static errorHandle(status: number, other: string) {
    const router = useRouter();
    // 状态码判断
    switch (status) {
      case 302:
        message.error("接口重定向了！");
        break;
      case 400:
        message.error(
          "发出的请求有错误，服务器没有进行新建或修改数据的操作==>" + status
        );
        break;
      // 401: 未登录
      // 未登录则跳转登录页面，并携带当前页面的路径
      // 在登录成功后返回当前页面，这一步需要在登录页操作。
      case 401: //重定向
        message.error("token:登录失效==>");
        removeToken();
        Storage.clear();
        setTimeout(() => {
          router.replace({
            path: "login",
          });
        }, 1000);
        break;
      // 403 token过期
      // 清除token并跳转登录页
      case 403:
        message.error("登录过期,用户得到授权，但是访问是被禁止的==>" + status);
        removeToken();
        Storage.clear();
        setTimeout(() => {
          router.replace({
            path: "login",
          });
        }, 1000);
        break;
      case 404:
        message.error("网络请求不存在==>" + status);
        break;
      case 406:
        message.error("请求的格式不可得==>" + status);
        break;
      case 408:
        message.error(" 请求超时！");
        break;
      case 410:
        message.error("请求的资源被永久删除，且不会再得到的==>" + status);
        break;
      case 422:
        message.error("当创建一个对象时，发生一个验证错误==>" + status);
        break;
      case 500:
        message.error("服务器发生错误，请检查服务器==>" + status);
        break;
      case 502:
        message.error("网关错误==>" + status);
        break;
      case 503:
        message.error("服务不可用，服务器暂时过载或维护==>" + status);
        break;
      case 504:
        message.error("网关超时==>" + status);
        break;
      default:
        message.error("其他错误错误==>" + status);
    }
  }
}
