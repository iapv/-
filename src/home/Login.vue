<template>
  <div id="app">
    <div class="contrainer">
      <div class="coik">
        <div class="toptxt">登录到剧本杀系统</div>
        <el-form ref="form" :model="form" label-width="0px" style="margin-top: 15px">
          <el-form-item>
            <el-input v-model="form.zhe" placeholder="输入账号/手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.pass"  show-password placeholder="输入密码"></el-input>
          </el-form-item>
          <div class="fm-btn-login" @click="log">登录</div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import jwt from "jsonwebtoken";
import {request} from "../requst";
export default {
  name: "Login",
  data() {
    return {
      form: {
        zhe: "",
        pass: "",
      },
    };
  },
  created() {},
  methods: {
    log() {
      request({
        method: "post",
        url: "/login",
        data: { admin: this.form.zhe, password: this.form.pass },
      }).then((rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          if (rep.data.code == "200" && rep.data.msg == "登录成功") {
            const token = rep.data.data.token;
            localStorage.setItem("uxToken", token);
            const decoded = jwt.decode(token);
            /*存储至vuex*/
            this.$store.dispatch("setLogin", !this.isEmpty(decoded)); //decoded空，函数返回真，取反假
            this.$store.dispatch("setUser", rep.data.data.user);
            /*跳转*/
            this.$router.push({ name: "index" });
          } else {
            this.$message.error( rep.data.msg);
          }
        }
      });

    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    },
  },
};
</script>
<style scoped>
#app {
  width: 100vw;
  height: 100vh;
  background: #333;
}

.contrainer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

}

.toptxt {
  display: block;
  height: 55px;
  text-align: center;
  font-size: 27px;
  font-weight: 600;
  color: #484848;
  ;
}

.coik {
  width: 410px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
}

>>>.el-input__inner {
  height: 55px;
}

.fm-btn-login {
  width: 410px;
  line-height: 60px;
  text-align: center;
  background-image: linear-gradient(#6299ff, #6299ff), linear-gradient(#6e94ff, #6e94ff);
  background-blend-mode: normal, normal;
  box-shadow: 0px 20px 30px 0px rgba(62, 123, 248, 0.3);
  border-radius: 5px;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
  -webkit-transition: all .3s;
  -moz-transition: all .3s;
  transition: all .3s;
  height: 60px;
}

.reg-ft {
  height: 20px;
  margin-top: 53px;
  font-size: 16px;
  color: #8d95a4;
  text-align: center;
}
.reg-ft a {
    color: #6e94ff;
}
</style>
