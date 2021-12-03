/*
 * @Author: 九阳
 * @Date: 2021-11-20 10:24:33
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-11-30 16:58:27
 */
import { App } from "vue";

import IconFont from "@/components/IconFont.tsx";
import VueTable from "@/components/table/Table.vue";
import VueSpan from "@/components/table/TableSpan.vue";
import VueHeader from "@/components/table/TableHeader.vue";
import VueForm from "@/components/form/form.vue";
import VueDrawer from "@/components/drawer/drawer.vue";
import VueForms from "@/components/vueForm/vueForm.vue";
import VueModal from "@/components/drawer/modal.vue";
import VueListForm from "@/components/vueForm/vueListForm.vue";

import vueD3inTerval from "@/components/chart/d3/interval.vue";
/**
 * 全局注册自定义组件
 * @param app
 */
export function setupCustomComponents(app: App) {
  app.component(IconFont.name, IconFont);
  app.component(VueTable.name, VueTable);
  app.component(VueSpan.name, VueSpan);
  app.component(VueHeader.name, VueHeader);
  app.component(VueForm.name, VueForm);
  app.component(VueDrawer.name, VueDrawer);
  app.component(VueForms.name, VueForms);
  app.component(VueModal.name, VueModal);
  app.component(VueListForm.name, VueListForm);

  app.component(vueD3inTerval.name, vueD3inTerval);
}
