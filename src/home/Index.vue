<template>
  <el-container>
    <el-header style="height: 80px">
      <div :class="adaptation.nav" :direction="visible">
        <h1>
          <!-- <img src="../../assets/logo.png" alt="" style="margin:0 auto"/> -->
          <svg
            t="1649932566821"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5821"
            width="86"
            height="86"
          >
            <path
              d="M713.5 294.3c-95.1 9.3-147.6 107.8-200.4 106.5-51.2-1.3-97.4-101.1-208.6-105.8-128.8-5.4-173.5 55-240.2-30.8 25.8 72.2-27.8 236.1 103 359.3 72.5 68.4 228.4 76.3 258.5 94.6 31.8 19.3 43.6 44.1 87.4 44.1 23.2 0 79.9-37 93.7-46.3 2.2-1.4 4.5-2.5 7-3.2 58.8-16.2 173.2-20.1 253.1-95.5 115-108.5 71.9-270.3 92.5-353-54.8 88.2-128.9 18.6-246 30.1zM188.7 413.8c54.7 20.5 117.7 0 162.5 26.1 35.8 20.9 60.2 72.8 60.2 128.9-88.2 14-226.9-3.5-222.7-155z m427.1 155c0-56 24.4-108 60.2-128.9 44.8-26.1 107.9-5.6 162.5-26.1 4.2 151.5-134.5 169-222.7 155z"
              fill="#409eff"
              p-id="5822"
            ></path>
          </svg>
        </h1>
        <h2 style="float: left; margin: 0 auto; line-height: 4.2">
          剧本杀后台管理
        </h2>
        <div class="op">
          <ul>
            <li class="nav-item"><a href="javascript:void(0);" style="color: BLACK">版本 V1012</a></li>
            <li class="nav-item"><a href="javascript:void(0);" style="color: red">{{expiretime}}后到期</a></li>
            <li class="nav-item"><a href="" @click="outlogin">退出登录</a></li>
          </ul>
        </div>
      </div>
    </el-header>

    <el-container>
      <el-main style="overflow: visible">
        <div :class="adaptation.main">
          <comon-aside ref="asides"></comon-aside>
          <div class="ro-container">
            <router-view></router-view>
          </div>
        </div>
        <!-- <div style="overflow:hidden">
          
        </div> -->
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import global from "../components/Global.vue";
import ComonAside from "../components/ComonAside.vue";
import { mapState } from "vuex";
export default {
  name: "Index",
  components: {
    ComonAside,
  },
  computed: {
    ...mapState(["expiretime"]),
  },
  created() {
    // 这里用了 箭头函数 其实可以不用 that 了，但是由于写 Es5 的习惯我就没改
    const that = this;
    // 核心方法，主要 根据窗口的变化 来控制布局
    window.onresize = () => {
      window.screenWidth = document.body.clientWidth;
      // 第二步
      that.screenWidth = window.screenWidth;
      window.screenWidth >= 1200
        ? (that.isCollapse = false)
        : (that.isCollapse = true);
      // that.changeWidth(window.screenWidth);
    };
    window.onresize();
  },
  data() {
    return {
      adaptation: {
        nav: "app-nav-lg",
        main: "app-main-lg",
        class: "",
      },
      // 第一步
      screenWidth: document.body.clientWidth,
      visible: null,
      isCollapse: false,
    };
  },
  mounted() {
    let _this = this; //很重要把父路由的vue实例赋给_this
    _this.$root.$on("next", function (idName) {
      //监听next事件，这里$root很重要，不懂去官网介绍
      // _this.getSele(idName); //调用父路由中的方法
    });
  },
  methods: {
    changeWidth(clientWidth) {
      this.visible = true;
      // 主要根据 窗口变化 到一定位置时，变换样式
      if (clientWidth >= 1200) {
        // el-menu-vertical-demo el-menu-demo
        this.adaptation.nav = "app-nav-lg";
        this.adaptation.main = "app-main-lg";
      } else if (clientWidth >= 992) {
        this.adaptation.nav = "app-nav-md";
        this.adaptation.main = "app-main-md";
      } else if (clientWidth >= 768) {
        this.adaptation.nav = "app-nav-sm";
        this.adaptation.main = "app-main-sm";
      } else if (clientWidth < 768) {
        this.adaptation.nav = "hidden-xs-only app-nav-xs";
        this.adaptation.main = "app-main-xs";
        this.visible = false;
      } else this.$message.warning({ message: "未知像素错误" });
      // console.log('当前窗口大小', clientWidth)
    },
    getSele(name) {
      // console.log(this.$refs.asides.defaultactive);
      // this.$refs.asides.defaultactive = name
      // this.$refs.asides.select(name)
    },
    outlogin() {
      localStorage.removeItem("uxToken");
      this.$store.dispatch("setLogin", false);
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.el-header {
  line-height: 80px;
}
.el-container {
  height: 100%;
}
.app-nav-lg {
   box-sizing: border-box;
  width: 1140px;
  height: 80px;
  margin: 0 auto;
  border-bottom: 1px solid #ccc;
}
.ro-container {
  box-sizing: border-box;
  width: 900px;
  float: left;
}
.app-main-lg {
  width: 1140px !important;
  margin: 0 auto;
  height: 100%;
}
.el-header h1 {
  float: left;
  font-weight: 400;
  margin: 0 auto;
}
.el-header .nav-item a.active::after {
  content: "";
  display: inline-block;
  position: absolute;
  bottom: 0;
  left: calc(50% - 15px);
  width: 30px;
  height: 2px;
  background: #409eff;
}
.el-header .nav-item a {
  text-decoration: none;
  color: #409eff;
  opacity: 0.5;
  display: block;
  padding: 0 22px;
}
.op {
  float: right;
}
.op ul {
  height: 100%;
  line-height: 80px;
  background: transparent;
  padding: 0;
  margin: 0;
}
.op .nav-item {
  margin: 0;
  float: left;
  list-style: none;
  position: relative;
  cursor: pointer;
}
</style>