/*
 * @Author: 九阳
 * @Date: 2021-11-20 10:16:21
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 16:56:46
 */
import { isNavigationFailure, Router } from "vue-router";
import { Storage } from "@/store/storage";

const allowList = ["login", "icons", "error", "error-404"]; // no redirect whitelist

const loginRoutePath = "/login";
const defaultRoutePath = "/dashboard";

export function createRouterGuards(router: Router) {
  router.beforeEach((to, from, next) => {
    const token = Storage.get("loginUser");
    if (to["path"] === "/login") {
      if (token) {
        next({ path: "/home" });
      } else {
        next();
      }
    } else {
      if (token) {
        next();
      } else {
        next({ path: "/login" });
      }
    }

    // if (token) {
    //   if (to.name === "login") {
    //     next({ path: defaultRoutePath });
    //   } else {
    //     const hasRoute = router.hasRoute(to.name!);
    //     if (allowList.includes(to.name as string) || hasRoute) {
    //       // 在免登录名单，直接进入
    //       next();
    //     }
    //   }
    // } else {
    //   // not login
    //   if (allowList.includes(to.name as string)) {
    //     // 在免登录名单，直接进入
    //     next();
    //   } else {
    //     next({
    //       path: loginRoutePath,
    //       query: { redirect: to.fullPath },
    //       replace: true,
    //     });
    //   }
    // }
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
