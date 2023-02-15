<template>
  <div style="float: left; height: 100%; width: 200px">
    <el-menu
      :default-active="defaultactive"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="select"
      style="height: 100%"
    >
      <el-menu-item
        v-for="item in noChliden"
        :index="item.path"
        :key="item.path"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <el-submenu
        v-for="item in hasChliden"
        :index="item.name"
        :key="item.name"
      >
        <template slot="title">
          <i :class="item.icon"></i>
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
      defaultactive: "alldata",
      isCollapse: true,
      menuop: 0,
      menus: [
        {
          id: 0,
          path: "alldata",
          name: "数据预览",
          icon: "el-icon-menu",
        },
        {
          id: 1,
          name: "基本设置",
          path: "basicset",
          icon: "el-icon-menu",
        },
        {
          id: 2,
          name: "剧本数据",
          icon: "el-icon-notebook-1",
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
              name: "手动添加",
              path: "addbook",
            },
            {
              id: 6,
              name: "剧本类别",
              path: "cate",
            },
          ],
        },
        {
          id: 3,
          name: "DM数据",
          path: "dmdata",
          icon: "el-icon-s-custom",
        },

        {
          id: 4,
          name: "其他设置",
          icon: "el-icon-s-tools",
          chliden: [
            {
              id: 9,
              name: "会员折扣",
              path: "vipprice",
            },
            {
              id: 10,
              name: "店内活动",
              path: 'activedata'
            },
            {
              id: 11,
              name: "意见反馈",
              path: 'opinion'
            },
          ],
        },
        {
          id: 5,
          name: "用户管理",
          icon: "el-icon-s-marketing",
          path: "userdata",
        },
        {
          id: 6,
          name: "组局管理",
          icon: "el-icon-data-board",
          path: "groupingdata",
        },
        {
          id: 7,
          name: "小程序",
          icon: "el-icon-box",
          path: "mokuai",
        },
        {
          id: 8,
          name: "主题房间",
          path: "shopdata",
          icon: "el-icon-takeaway-box",
        },
      ],
    };
  },
  created() {
    this.$router.push({
      name: "alldata",
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