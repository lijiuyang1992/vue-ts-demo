/*
 * @Author: 九阳
 * @Date: 2021-11-26 14:53:38
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 14:53:40
 */
export function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export function getUUID(): string {
  let d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }
  const uuid = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
export function checkBoolean(value: any): boolean {
  if (value !== null && value !== undefined && value !== "") {
    return true;
  }
  return false;
}
