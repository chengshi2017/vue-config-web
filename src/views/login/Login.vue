<template>
  <div class="login">
    <a-layout>
      <a-layout-content class="login-bg">
        <div class="login-form">
          <a-form :form="form">
            <div class="form-signing-heading"><span>IT服务管理系统</span></div>
            <div style="margin: 0 30px 0 40px;">
              <div style="float: left; width: 10%; margin-top: 3%;">
                <img src="@/assets/images/login/user.png" />
              </div>
              <a-form-item
                class="form-control"
              >
                <a-input
                  v-decorator="[
                    'userName',
                    {rules: [{ required: true, message: '请输入登录用户名' }]}
                  ]"
                  placeholder="请输入用户名"
                  size="large"
                  style="width: 80%;"
                  :auto-focus="true"
                  @pressEnter="login"
                />
              </a-form-item>
              <div style="float: left; width: 10%;margin-top: 3%">
                <img src="@/assets/images/login/password.png" />
              </div>
              <a-form-item
                class="form-control"
              >
                <a-input
                  v-decorator="[
                    'userPass',
                    {rules: [{ required: true, message: '请输入登录密码' }]}
                  ]"
                  type="password"
                  size="large"
                  placeholder="请输入密码"
                  style="width: 80%"
                  @pressEnter="login"
                />
              </a-form-item>
              <!--<div style="display: flex">-->
              <!--<div style="width: 10%; margin-top: 3%">-->
              <!--<img src="./../../assets/images/login/captcha.png">-->
              <!--</div>-->
              <!--<a-form-item-->
              <!--style="flex: 1"-->
              <!--fieldDecoratorId="captcha"-->
              <!--:fieldDecoratorOptions="{ rules: [{ required: false, message: '请输入验证码' }] }">-->
              <!--<a-input placeholder="请输入验证码(选填)" size="large" @pressEnter="login" />-->
              <!--</a-form-item>-->
              <!--<div style="width: 40%">-->
              <!--<img title="点击更换" ref="captchaImg" @click="refreshCaptcha" src="" class="captcha"/>-->
              <!--</div>-->
              <!--</div>-->
              <div class="form-control" v-if="errorMessage !== null">
                <label
                  style="color: red;margin-left: 10%; font-size: 16px"
                  v-text="errorMessage"
                ></label>
              </div>
              <a-button
                @click="login"
                title=""
                size="large"
                style="width: 88%"
                type="primary"
                plain
              >登录</a-button
              >
            </div>
          </a-form>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import { generateEncryptedLoginData } from '@/utils/common';

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      form: this.$form.createForm(this),
      errorMessage: null,
      currUser: '',
      startLoading: false
    };
  },
  mounted() {
    // 初始化验证码
    // this.$refs.captchaImg.src = this.GLOBAL.apiITSM + '/api/auth/getCaptcha'
  },
  methods: {
    // refreshCaptcha () {
    //   this.$refs.captchaImg.src = this.GLOBAL.apiITSM + '/api/auth/getCaptcha'
    // },
    login() {
      const { validateFields, getFieldsValue } = this.form;
      validateFields(async err => {
        if (!err) {
          let userLogin = getFieldsValue();
          const encryptedUserLoginObj = await generateEncryptedLoginData(
            userLogin
          );
          const paramObj = {
            paramObject: JSON.stringify(encryptedUserLoginObj),
          };
          this.$store
            .dispatch('LoginByUserName', paramObj)
            .then(res => {
              if (res.code === '111111') {
                this.$router.push({ path: '/' });
              } else if (res.code === '010101') {
                this.errorMessage = '密码错误或者登录用户名不存在, 请重试';
              } else {
                // this.refreshCaptcha();
                this.errorMessage = res.message;
              }
            })
            .catch(() => {
              // this.refreshCaptcha();
              this.errorMessage = '服务器连接错误, 请与系统管理员联系';
            })
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-bg {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background: #3283ac url('../../assets/images/login/login-bg.jpg') no-repeat center;
}
.login-form {
  position: absolute;
  width: 507px;
  height: 325px;
  left: 55%;
  top: 50%;
  margin-left: -309px;
  margin-top: -184px;
  background: url('./../../assets/images/login/loginform-bg.png') no-repeat;
}
.login-form .form-signing-heading {
  margin: 20px 0 20px 10px;
  font-size: 28px;
  color: #262626;
  letter-spacing: 0;
  text-align: center;
}
.login-form .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 5px;
  font-size: 16px;
}
.captcha {
  cursor: pointer;
  margin-left: 1rem;
  height: 60%;
  width: 60%;
}
</style>
