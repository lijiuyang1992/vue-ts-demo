/*
 * @Author: 九阳
 * @Date: 2021-11-18 14:24:57
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-18 14:38:05
 */
// 存储，关闭浏览器删除
export class SessionStorage {
  constructor() {}
  getSession(key: string) {
    return sessionStorage.getItem(key);
  }
  setSession(key: string, value: any) {
    return sessionStorage.setItem(key, value);
  }
  removeItem(key: string) {
    sessionStorage.removeItem(key);
  }
  clean() {
    sessionStorage.clear();
  }
}
// local:永久存储，手动删除
export class LocalStorage {
  constructor() {}
  getStorage(key: string) {
    return localStorage.getItem(key);
  }
  setStorage(key: string, value: any) {
    return localStorage.setItem(key, value);
  }
  removeItem(key: string) {
    localStorage.removeItem(key);
  }
  clean() {
    localStorage.clear();
  }
}
