<template>
  <div id="app">
    <div class="contrainer">
      <div class="coik">
        <div class="toptxt">登录到Player剧本杀系统</div>
        <el-form ref="form" :model="form" label-width="0px" style="margin-top: 15px">
          <el-form-item>
            <el-input v-model="form.accout" placeholder="输入账号/手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password"  show-password placeholder="输入密码"></el-input>
          </el-form-item>
          <div class="fm-btn-login" @click="login">登录</div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
let app = require("./login.js");
export default app;
</script>
<style scoped>
@import url("./login.css");
</style>