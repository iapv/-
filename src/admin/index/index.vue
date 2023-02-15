<template>
  <div id="app">
    <el-container style="height: 100vh">
      <el-aside width="280px">
        <u-aside></u-aside>
      </el-aside>
      <el-container>
        <el-header id="header">
          <i
            class="iconfont i-gengduo header-icon"
            style="font-size: 30px; line-height: 70px; float: left"
          ></i>
          <div class="kualan">
            <span style="margin-left: 14px">首页</span>
            <div class="right-box">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <div
                    style="
                      height: 70px;
                      display: flex;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                    "
                    slot="reference"
                  >
                    <el-avatar :src="usericon"></el-avatar>
                  </div>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus"
                    >黄金糕</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-circle-plus"
                    >狮子头</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-circle-plus-outline"
                    >螺蛳粉</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-check"
                    >双皮奶</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-circle-check"
                    >蚵仔煎</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-main style="background-color: #e9eef3">
          <router-view></router-view>
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import aside from "../../components/Aside.vue";
export default {
  components: {
    "u-aside": aside,
  },
  created() {

  },
  data() {
    return {
      name: "nn",
      usericon:
        "https://tse2-mm.cn.bing.net/th/id/OIP-C.lj7oR8TnYvdSyVwP0B0LpAAAAA?w=203&h=204&c=7&r=0&o=5&pid=1.7",
    };
  },
};
</script>
<style scoped>
@import url("./index.css");
</style>