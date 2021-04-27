<template>
  <div id="login">
    <div class="login-content">
      <ul class="login-wrap">
        <li
          v-for="(item, index) in tabData"
          :key="index"
          :class="{ current: tabIndex == index }"
          @click="toggleTab(item, index)"
        >
          {{ item.name }}
        </li>
      </ul>
      <el-form
        :model="dataForm"
        :rules="rules"
        ref="dataForm"
        label-width="100px"
        class="login-form"
        label-position="top"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input
            type="text"
            v-model="dataForm.email"
            clearable
            maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            v-model="dataForm.password"
            clearable
            maxlength="20"
            minlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="pass"
          v-if="tabStatus == 'register'"
        >
          <el-input
            type="password"
            v-model="dataForm.pass"
            clearable
            maxlength="20"
            minlength="10"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row type="flex" justify="space-between" :gutter="10">
            <el-col :span="15">
              <el-input
                type="text"
                v-model="dataForm.code"
                clearable
                maxlength="20"
                minlength="10"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="warning" @click="getSms()">获取验证码</el-button></el-col
            >
          </el-row>
        </el-form-item>
        <el-form-item class="btn-style">
          <el-button type="danger" @click="submitForm()">提交</el-button>
          <el-button type="success" @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {
  stripscript,
  validEmail,
  validPass,
  validCode,
} from "@/utils/valdate.js";
import {getCode} from '@/api/login.js';
export default {
  name: "login",
  props: {},
  data() {
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        this.dataForm.password = stripscript(value);
        value = stripscript(value);
        console.log(value);
        if (validPass(value)) {
          callback(new Error("密码格式不正确"));
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value != this.dataForm.password) {
        callback(new Error("两次密码不一样"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (validEmail(value)) {
          callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validCode(value)) {
        callback(new Error("验证码格式不正确"));
      } else {
        callback();
      }
    };
    return {
      tabData: [
        { name: "登录", status: "login" },
        { name: "注册", status: "register" },
      ],
      tabIndex: "0",
      dataForm: {
        email: "",
        password: "",
        pass: "",
        code: "",
      },
      tabStatus: "login",
      rules: {
        password: [{ validator: validatePassword, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        email: [
          {
            validator: validateEmail,
            trigger: "blur",
          },
        ],
        code: [
          {
            validator: validateCode,
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
      //切换状态
    toggleTab(data, index) {
      this.tabIndex = index;
      this.tabStatus = data.status;
    },
    //获取验证码
    getSms(){
        getCode();
    },
    submitForm() {
    
    },
    resetForm() {
      this.$refs.dataForm.resetFields();
      this.dataForm.pass = "";
    },
  },
  watch: {},
  filter: {},
};
</script>
<style lang="scss">
#login {
  height: 100vh;
  background: #334465;
  position: relative;
  .login-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login-wrap {
      text-align: center;
      li {
        display: inline-block;
        list-style: none;
        width: 150px;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #fff;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
      .current {
        background: rgba(203, 226, 15, 0.1);
      }
    }
    .login-form {
      .el-form-item {
        .el-button--warning {
          width: 100%;
        }
        .el-form-item__label {
          padding: 0 !important;
          color: #fff;
        }
      }
      .btn-style {
        text-align: right;
      }
    }
  }
}
</style>
