/*
 * @Author: 李九阳
 * @Date: 2021-12-10 09:11:47
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 09:23:10
 */
// 引入外部 插件
import dataV from "@jiaminghi/data-view";

export const setupExternal = (app) => {
  app.use(dataV);
};
