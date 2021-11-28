/*
 * @Author: 九阳
 * @Date: 2021-11-20 10:24:33
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-27 10:40:31
 */
import type { App } from "vue";

import Antd from "ant-design-vue";
import LocaleProvider from "ant-design-vue";

export function setupAntd(app: App<Element>) {
  app.use(Antd);
  app.use(LocaleProvider);
}
