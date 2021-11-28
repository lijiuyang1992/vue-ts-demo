<!--
 * @Author: 九阳
 * @Date: 2021-11-20 10:06:05
 * @LastEditors: 九阳
 * @LastEditTime: 2021-11-28 13:46:23
-->
<template>
  <div class="login-box">
    <img alt="Vue logo" src="~@/assets/logo.png" />
    <div class="login-logo">
      <svg-icon icon-class="logo" />
      <h1>VUE3.0 Admin</h1>
    </div>
    <a-form
      layout="horizontal"
      :model="formInline"
      @submit.prevent="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-model:value="formInline.username"
          size="large"
          placeholder="admin"
        >
          <template #prefix><user-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="formInline.password"
          size="large"
          type="password"
          placeholder="123456"
          autocomplete="new-password"
        >
          <template #prefix><lock-outlined type="user" /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="loading"
          block
        >
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref, PropType } from "vue";
import { message } from "ant-design-vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
// import md5 from 'blueimp-md5'
// ~@/assets/logo.png
import { useRoute, useRouter } from "vue-router";
import { Storage } from "@/store/storage";
import { loginUser } from "@/type/userType";
import selectData from "@/data/selectData";
import { userLogin } from "@/api/login";

export default defineComponent({
  name: "Login",
  components: { UserOutlined, LockOutlined },
  setup() {
    const state = reactive({
      loading: false,
      formInline: {
        username: "",
        password: "",
      },
    });
    const router = useRouter();
    const route = useRoute();
    const handleSubmit = async () => {
      const { username, password } = state.formInline;
      if (username.trim() == "" || password.trim() == "") {
        return message.warning("用户名或密码不能为空！");
      }
      const params = {
        username,
        password,
      };
      // 模拟测试api
      // try {
      //   userLogin(params).then((res: any) => {
      //     console.log("调用成功");
      //     console.log(res);
      //   });
      // } catch (e: any) {
      //   console.log("接口调用失败");
      //   console.log(e);
      // }

      // message.loading("登录中...", 0);
      state.loading = true;
      console.log(state.formInline);

      const toPath = decodeURIComponent(
        (route.query?.redirect || "/") as string
      );
      Storage.set("loginUser", params);
      const user: loginUser = {
        name: "管理员",
        jobNo: "admin",
        userName: "admin",
        phone: "13123456789",
        departmentName: "测试部门",
        departmentCode: "1001",
      };
      for (const key in selectData) {
        const select = Storage.get(key);
        if (select === undefined || select === null) {
          Storage.set(key, selectData[key]);
        }
      }
      Storage.set("userInfo", user);
      router.replace(toPath).then((_) => {
        if (route.name == "login") {
          router.replace("/");
        }
      });
    };
    return {
      ...toRefs(state),
      handleSubmit,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-box {
  display: flex;
  width: 100vw;
  height: 100vh;
  padding-top: 140px;
  background: url("~@/assets/login.svg");
  background-size: 100%;
  flex-direction: column;
  align-items: center;

  .login-logo {
    display: flex;
    margin-bottom: 30px;
    align-items: center;

    .svg-icon {
      font-size: 48px;
    }

    img {
      height: 48px;
    }

    h1 {
      margin-bottom: 0;
      margin-left: 10px;
    }
  }

  :deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }

    .ant-form-item-label {
      padding-right: 6px;
    }
  }
}
</style>
