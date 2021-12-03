/*
 * @Author: 九阳
 * @Date: 2021-11-26 14:53:38
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-01 21:22:37
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

//一个值在 该数组值某字段这都相同 返回 true
/**
 *
 * @param value 值
 * @param lists 数组
 * @param listKey 字段编码
 */
export const ArrayEvery = (
  value: string,
  lists: any,
  listKey: string
): boolean => {
  return lists.every((list: any) => list[listKey] === value);
};
//一个值在 该数组值某字段存在 true,
/**
 *
 * @param value 值
 * @param lists 数组
 * @param listKey 字段编码
 */
export const ArraySome = (
  value: string,
  lists: any,
  listKey: string
): boolean => {
  return lists.some((list: any) => list[listKey] === value);
};

// 字符串方法

/**
 *
 * @param content 字符串内容
 * @param value  查询的字符
 * @param index  开始位置 不传默认 0
 *  查询的字符在改字符内容存在 返回true
 */

export const includesString = (
  content: string,
  value: string,
  index?: number | 0
): boolean => {
  return content.includes(value, index);
};
/**
 *
 * @param content 字符串内容
 * @param value  查询的字符
 * @param index  开始位置 不传默认 0
 *  查询字符内容已字符（value）开始  返回true
 */
export const startsWithString = (
  content: string,
  value: string,
  index?: number | 0
): boolean => {
  return content.startsWith(value, index);
};

/**
 *
 * @param content 字符串内容
 * @param value  查询的字符
 * @param index  开始位置 不传默认 0
 *  查询字符内容已字符（value）结尾 返回true
 */
export const endWithString = (
  content: string,
  value: string,
  index?: number | 0
): boolean => {
  return content.endsWith(value, index);
};

/**
 *
 * @param value 字符串
 * @param index 次数
 * 返回将原来字符串重复几次
 */
export const repeatString = (value: string, index: number | 0): string => {
  return value.repeat(index);
};

/**
 *
 * @param content 原来字符
 * @param value  补充字符
 * 在原来字符头部位置补充字符串
 */
export const padStartString = (content: string, value: string): string => {
  const index = content.length + value.length;
  return content.padStart(index, value);
};

/**
 *
 * @param content 原来字符
 * @param value  补充字符
 * 在原来字符结尾位置补充字符串
 */
export const padEndString = (content: string, value: string): string => {
  const index = content.length + value.length;
  return content.padEnd(index, value);
};

//  map 值可以是 undefined, function  JSON 值不可以是 function
export const mapToJson = (map: any): any => {
  return JSON.stringify([...map]);
};

export const jsonToMap = (json: any): any => {
  return new Map(JSON.parse(json));
};
