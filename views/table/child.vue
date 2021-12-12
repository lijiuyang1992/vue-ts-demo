<!--
 * @Author: 李九阳
 * @Date: 2021-12-10 20:13:41
 * @LastEditors: 李九阳
 * @LastEditTime: 2021-12-10 20:30:09
-->
<template>
  显示父组件信息(props)： {{ msg }}
   <br/>
  显示父组件信息(useAttrs)： {{ atts }}
   <br/>
  显示父组件信息(provide - inject)： {{ name }}
   <br/>
  <button @click="myClick"></button>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useAttrs, inject } from "vue";

export default defineComponent({
  name: "child",
  props: {
    msg2: {
      type: String,
      defalut: "",
    },
  },
  setup(props) {
    const msg = ref(props.msg2);
    const myClick = () => {
      console.log("编辑*********");
    };
    const atts = useAttrs();
    console.log("useAttrs");
    console.log(atts);
    const name = inject("name");
    return {
      msg,
      myClick,
      atts,
      name,
    };
  },
});
</script>
