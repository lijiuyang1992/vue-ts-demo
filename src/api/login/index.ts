/*
 * @Author: 九阳
 * @Date: 2021-11-28 10:36:48
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 10:36:49
 */
import http from "@/http/index";
export function userLogin(data: any) {
  return http.request({
    url: "/user/login",
    method: "post",
    data,
  });
}
