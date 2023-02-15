<template>
  <div style="height:100%">
    
    <el-menu
      :default-active="defaultactive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="select"
      background-color="#252831"
      text-color="#fff"
      active-text-color="#409EFF"
      style="height: 100%"
    >
    <h1 style=" text-align: center;color: #fff; line-height: 40px;font-size: 25px">HERO</h1>
      <el-menu-item
        v-for="item in noChliden"
        :index="item.path"
        :key="item.path"
      >
        <i :class="item.icon" style="font-size: 18px;margin-right: 10px"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <el-submenu
        v-for="item in hasChliden"
        :index="item.name"
        :key="item.name"
      >
        <template slot="title">
         <i :class="item.icon" style="font-size: 18px;margin-right: 10px"></i>
          <span>{{ item.name }}</span>
        </template>

        <el-menu-item
          v-for="line in item.chliden"
          :key="line.path"
          :index="line.path"
          >{{ line.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </div>
</template>


<style scoped>
.avd {
  width: 240px;
  height: 45px;
  text-align: left;
  border-radius: 5px;
  background: rgb(217, 236, 255) none repeat scroll 0% 0%;
  padding-left: 10px;
  margin-bottom: 15px;
}
.line {
  width: 240px;
  height: 45px;
  text-align: left;
  border-radius: 5px;
  padding-left: 10px;
  margin-bottom: 15px;
}
.line span {
  color: #2c3e50;
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  text-decoration: none;
}
.avd span {
  color: #2c3e50;
  display: block;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  text-decoration: none;
}
</style>

<script>
export default {
  data() {
    return {
      defaultactive: 'control',
      isCollapse: true,
      menuop: 0,
      menus: [
        {
          id: 1,
          name: "控制台",
          path: "control",
          icon: "iconfont i-shouye",
        },
        {
          id: 2,
          name: "程序配置",
          icon: "iconfont i-safe",
          chliden: [
            {
              id: 3,
              name: "全部剧本",
              path: "script",
              icon: "s-home",
            },
            {
              id: 4,
              name: "添加剧本",
              path: "addsc",
            },
            {
              id: 5,
              name: "采集剧本",
              path: "gather",
            },
          ],
        },
        {
          id: 3,
          name: "商家管理",
          path: "admin_shop",
          icon: "iconfont i-shop",
        },
        {
          id: 4,
          name: "权限管理",
          icon: "iconfont i-daima",
          chliden: [
            {
              id: 5,
              name: "主题房间",
              path: "shopdata",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.$router.push({
      name: "control",
    });
  },
  methods: {
    handleClick(item, index) {
      this.menuop = index;
      this.$router.push({
        name: item.path,
      });
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    select(key) {
      this.$router.push({
        name: key,
      });
    },
  },
  computed: {
    noChliden() {
      return this.menus.filter((item) => !item.chliden);
    },
    hasChliden() {
      return this.menus.filter((item) => item.chliden);
    },
  },
};
</script>