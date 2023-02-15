<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import jwt from "jsonwebtoken";
export default {
  name: "App",
  created() {
    /*在根组件进行判断，否则刷新就没了*/
    this.initData();
  },
  methods: {
    // 有token时初始化数据
    initData() {
      if (localStorage.uxToken) {
        const decoded = jwt.decode(localStorage.uxToken);
        let _this = this;
        this.$api.get("/siteinfo", {}, (response) => {
          if (response.status >= 200 && response.status < 300) {
            if (
              response.data.msg == "程序已到期"
            ) {
              this.$confirm("此程序已到期, 是否联系管理员续期?", "到期提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                closeOnClickModal: false,
              })
                .then(() => {
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                  });
                })
                .catch(() => {
                  window.opener = null;
                  window.open("", "_self");
                  window.close();
                });
            } else {
              let user = new Object();
              user.id = response.data.data.id;
              user.name = response.data.data.site_name;
              _this.$store.dispatch("setUser", user);
              
              /*存储至vuex*/
              _this.$store.dispatch("setLogin", !this.isEmpty(decoded));
              _this.$store.dispatch("setExpiretime", response.data.expireTime);
            }
          } else {
            localStorage.removeItem("uxToken");
            _this.$store.dispatch("setLogin", false);
          }
        });
      }
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

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  font-size: 14px;
  margin: 0px;
}
html,
body {
  margin: 0px;
  width: 100%;
  height: 100%;
}
a {
  text-decoration: none;
}
.h1,
.h2,
.h3,
.h4,
.h5,
.h6,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin-bottom: 0.5rem;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  color: inherit;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 10px 0;
  margin-top: 10px;
  margin-bottom: 10px;
}
.float-right {
  float: right !important;
}
.align-self-center {
  -ms-flex-item-align: center !important;
  align-self: center !important;
}
.h5,
h5 {
  font-size: 1rem;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 10px 0;
  margin-bottom: 10px;
}
</style>
