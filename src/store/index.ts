/*
 * @Author: 九阳
 * @Date: 2021-11-16 09:51:34
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-20 17:26:24
 */
import { createStore, useStore as baseUseStore, Store } from "vuex";

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {},
});
export const userInfoKey: any | undefined = Symbol();

export function useStore() {
  return baseUseStore(userInfoKey);
}
