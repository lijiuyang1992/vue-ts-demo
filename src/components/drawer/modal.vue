<!--
 * @Author: 九阳
 * @Date: 2021-11-27 10:19:00
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-27 11:06:24
-->
<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    @cancel="onClose"
    :width="920"
  >
    <template #footer>
      <slot name="modalFooter"></slot>
    </template>
    <slot name="modalBody"></slot>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
export default defineComponent({
  name: "vueModal",
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
<style lang="scss" scoped>
:deep(.ant-modal-footer) {
  text-align: center;
}
:deep(.ant-modal-header) {
  text-align: center;
}
</style>
