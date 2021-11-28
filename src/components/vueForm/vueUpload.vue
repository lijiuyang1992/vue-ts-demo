<!--
 * @Author: 九阳
 * @Date: 2021-11-26 13:01:01
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-26 15:34:14
-->
<template>
  <!--  上传附件类型-->
  <template
    v-if="uploadField['subType'] === 'picture-card'"
    class="upload-picture-card"
  >
    <a-form-item
      :ref="uploadField['field']"
      :label="uploadField['label']"
      :name="uploadField['field']"
      :required="uploadField['required']"
      :rules="uploadRules"
    >
      <a-upload
        :action="uploadField['fileUrl']"
        list-type="picture-card"
        v-model:file-list="fileList"
        @preview="handlePreview"
      >
        <div v-if="fileList.length < 8">
          <plus-outlined />
          <div class="ant-upload-text">上传图片</div>
        </div>
      </a-upload>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>
    </a-form-item>
  </template>
  <!--  上传附件类型-->
  <template v-if="uploadField['subType'] === 'picture'" class="upload-picture">
    <a-form-item
      :ref="uploadField['field']"
      :label="uploadField['label']"
      :name="uploadField['field']"
      :required="uploadField['required']"
      :rules="uploadRules"
    >
      <a-upload
        :action="uploadField['fileUrl']"
        list-type="picture"
        v-model:file-list="fileList"
        class="upload-list-inline"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          文件上传
        </a-button>
      </a-upload>
    </a-form-item>
  </template>
  <!--  上传附件类型-->
  <template v-if="uploadField['subType'] === 'text'">
    <a-form-item
      :ref="uploadField['field']"
      :label="uploadField['label']"
      :name="uploadField['field']"
      :required="uploadField['required']"
      :rules="uploadRules"
    >
      <a-upload
        :action="uploadField['fileUrl']"
        :multiple="true"
        :file-list="fileList"
        @change="handleChange"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          文件上传
        </a-button>
      </a-upload>
    </a-form-item>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref, PropType, watch } from "vue";
import { Storage } from "@/store/storage";
import { FormType } from "@/type/formType";
import { PlusOutlined } from "@ant-design/icons-vue";
import { getBase64, getUUID, checkBoolean } from "@/utils/method.ts";

export default defineComponent({
  name: "vueFormUpload",
  components: {
    PlusOutlined,
  },
  props: {
    dataValue: {
      type: String,
      default: "",
    },
    formField: {
      type: Object as PropType<FormType>,
      default: () => ({}),
    },
  },
  emits: ["update:dataValue"],
  setup(props, { emit }) {
    let fileId = String(props.dataValue);
    if (!checkBoolean(fileId)) {
      fileId = getUUID();
      emit("update:dataValue", fileId);
    }

    const uploadValue = ref(fileId);
    const uploadField = ref(props.formField);
    const previewVisible = ref<boolean>(false);
    const previewImage = ref<string | undefined>("");
    const fileList = ref([]);
    let uploadRules: any = ref([]);
    if (uploadField.value["required"]) {
      uploadRules = ref(uploadField.value["rule"]);
    }
    watch(
      () => props.dataValue,
      (newValue, oldValue) => {
        uploadValue.value = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );
    watch(
      () => props.formField,
      (newValue, oldValue) => {
        uploadField.value = JSON.parse(JSON.stringify(newValue));
      },
      {
        deep: true,
        immediate: true,
      }
    );

    const handleCancel = () => {
      previewVisible.value = false;
    };
    const handlePreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string;
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };
    const handleChange = ({ fileList: newFileList }: any) => {
      fileList.value = newFileList;
    };

    return {
      uploadField,
      uploadValue,
      fileList,
      previewVisible,
      previewImage,
      handleCancel,
      handlePreview,
      handleChange,
      uploadRules,
    };
  },
});
</script>
<style lang="scss" scoped>
.upload-picture {
  .upload-list-inline :deep(.ant-upload-list-item) {
    float: left;
    width: 200px;
    margin-right: 8px;
  }
  .upload-list-inline :deep(.ant-upload-animate-enter) {
    animation-name: uploadAnimateInlineIn;
  }
  .upload-list-inline :deep(.ant-upload-animate-leave) {
    animation-name: uploadAnimateInlineOut;
  }
}

.upload-picture-card {
  /* you can make up upload button and sample style by using stylesheets */
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
}
</style>
