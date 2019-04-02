<template>
  <a-row>
    <a-col :xs="2" :sm="6" :md="6" :lg="8" :xl="8"></a-col>
    <a-col :xs="20" :sm="12" :md="24" :lg="8" :xl="8" class="loginform-container">
        <p class="login-title">ems管理系统</p>
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
        >
        <a-form-item>
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: 'Please input your username!' }] }
            ]"
            placeholder="Username"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="[
              'password',
              { rules: [{ required: true, message: 'Please input your Password!' }] }
            ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-checkbox
            v-decorator="[
              'remember',
              {
                valuePropName: 'checked',
                initialValue: true,
              }
            ]"
          >记住账号</a-checkbox>

          <a-button type="primary" html-type="submit" class="login-form-button" >点击登录</a-button>
        </a-form-item>
      </a-form>
    </a-col>
    <a-col :xs="2" :sm="4" :md="6" :lg="8" :xl="8"></a-col>
  </a-row>
</template>

<script>
import axios from "axios";
export default {
  data(){
      return{
          UserName:'',
          PassWord:'',
      }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          axios.get('http://localhost:9000/users/all').then(
              res=>console.log(res.data)
          )
        }
      });
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.loginform-container {
}
.login-title {
  text-align: center;
  margin-top: 25vh;
}
</style>