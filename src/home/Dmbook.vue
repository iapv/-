<template>
  <div class="container">
    <div class="topnav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/dmdata' }"
          >DM数据</el-breadcrumb-item
        >
        <el-breadcrumb-item>DM剧本</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <div class="user">
        <el-avatar
          :src="imageurl + covere"
          :size="80"
        ></el-avatar>
        <div class="usercon">
          <div class="username">{{name}}</div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="list">
        <div class="grid-item" v-for="item in data" :key="item.index">
          <div class="cover">
            <el-image
              style="width: auto; height: 170px"
              :src="imageurl + item.cover"
              :fit="fit"
            ></el-image>
          </div>
          <div class="con">
            <div class="tits">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import global from "../components/Global.vue";
import ListAdapter from "../components/ListAdapter.vue";
export default {
  components: {},
  data() {
    return {
      baseurl: global.baseUrl,
      imageurl: global.ImageUrl,
      covere: "",
      name: "",
      data: [],
      fit: "cover",
    };
  },
  methods: {
    initdata() {
      this.$api.post("/Ajaxapi?action=getDmDetail", { id: this.$route.params.id }, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          console.log(rep.data.cover);
          this.covere = rep.data.cover
          this.name = rep.data.name
          this.data = rep.data.book;
        }
      });
    },
  },
  created() {
    this.initdata();
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  text-align: left;
  float: left;
  overflow-x: auto;
}

.container .tit {
  float: left;
  width: 180px;
  font-size: 30px;
}
.content {
  clear: right;
  margin-top: 0px;
  margin: 10px 0px 20px 20px;
}
.topnav {
  height: 40px;
  margin: 10px 0px 20px 20px;
}
.user {
  display: flex;
  align-items: center;
}
.usercon {
  margin-left: 10px;
  font-size: 17px;
  font-weight: 400;
}
.list {
  clear: right;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  overflow: hidden;
  margin-top: 20px;
}
.grid-item {
  width: 120px;
  margin-bottom: 10px;
}
.tits {
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 10px;
}
.cover {
  position: relative;
  width: 120px;
  z-index: 999;
}
.cover .el-image {
  border-radius: 10px;
}
.el-image {
  position: relative;
  z-index: -1;
}
.con {
  text-align: center;
  padding: 4px;
}
</style>