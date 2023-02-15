<template>
  <div class="container" style="margin: 10px;">
    <div class="panel-heading">
      <div class="panel-lead">
        <em>用户管理</em>
        <p>在此可以查看用户数据，可视化数据请以小程序为准</p>
      </div>
    </div>
    <div class="navapp">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="全部数据" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      activeName: "first",
    };
  },
  created() {
  },
  methods: {}
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
  margin-top: 15px;
}
.e9btn {
  float: right;
  margin-right: 20px;
}
.topnam {
  height: 80px;
}
.control {
  background-color: #fff;
}
.navapp {
  background-color: #fff;
}
.panel {
  margin-bottom: 18px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 3px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.panel-heading {
  padding: 15px;
  padding-bottom: 0px;
  padding-bottom: 0;
  background: #f5f7fa;
  border-color: #f5f7fa;
  position: relative;
}

>>> .el-tabs--border-card {
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
>>> .el-tabs--border-card > .el-tabs__content {
  padding: 0px;
}
p {
  padding-bottom: 10px;
  margin-bottom: 0px;
}
</style>