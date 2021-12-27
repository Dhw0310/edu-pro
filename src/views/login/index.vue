<template>
  <div class="login">
    <el-form ref="form"
             class="login-form"
             :model="form"
             label-width="80px"
             label-position="top">
      <el-form-item label="手机号">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   class="login-btn"
                   @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
export default Vue.extend({
  name: 'loginIndex',
  data() {
    return {
      form: {
        password: '111111',
        phone: '18201288771'
      }
    }
  },
  methods: {
    // 18201288771  111111
    async onSubmit() {
      const { data } = await request({
        method: 'post',
        url: '/front/user/login',
        data: this.form
      })
      console.log(data)
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    min-width: 300px;
    padding: 20px;
    border-radius: 5px;
    background: #fff;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
