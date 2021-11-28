/*
 * @Author: 九阳
 * @Date: 2021-11-16 09:51:34
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-18 13:54:22
 */
// import VueRouter, { useRouter } from 'vue-router'
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// declare module 'vue/types/vue' {
//   interface Vue {
//     $router: VueRouter,
//     $route: useRouter
//   }
// }
