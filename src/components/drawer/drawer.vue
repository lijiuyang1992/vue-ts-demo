<!--
 * @Author: 九阳
 * @Date: 2021-11-25 20:32:29
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-27 11:01:56
-->
<template>
  <a-drawer
    :headerStyle="{ 'text-align': 'center' }"
    :title="title"
    :width="920"
    :visible="visible"
    placement="right"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <slot name="drawerBody"></slot>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'center',
        zIndex: 1,
      }"
    >
      <slot name="drawerFooter"></slot>
    </div>
  </a-drawer>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from "vue";
export default defineComponent({
  name: "vueDrawer",
  components: {},
  props: {
    isVisible: {
      type: Boolean,
      default: true,
    },
    modelTitle: {
      type: String,
      default: "",
    },
  },
  emits: ["update:isVisible"],

  setup(props, { emit }) {
    const title = ref<string>(props.modelTitle);
    const visible = ref<boolean>(props.isVisible);

    const showDrawer = () => {
      visible.value = true;
    };

    const onClose = () => {
      visible.value = false;
      emit("update:isVisible", false);
    };
    watch(
      () => props.isVisible,
      (newValue, oldValue) => {
        visible.value = newValue;
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.modelTitle,
      (newValue, oldValue) => {
        title.value = newValue;
      },
      {
        deep: true,
        immediate: true,
      }
    );
    return {
      title,
      visible,
      showDrawer,
      onClose,
    };
  },
});
</script>
<style scoped>
:deep(.ant-drawer-title) {
  text-align: center;
}
</style>
