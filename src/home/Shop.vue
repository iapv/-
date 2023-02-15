<template>
  <div id="app" style="margin: 10px">
    <div class="panel-heading">
      <div class="panel-lead">
        <em>主题房间</em>
        <p >在此可以查看房间数据，编辑房间数据，可视化数据请以小程序为准</p>
      </div>
    </div>
    <div class="navapp">
      <el-tabs v-model="activeName" type="border-card" >
        <el-tab-pane label="全部数据" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="control">
      <router-view></router-view>
       
    </div>
   
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName:'first'
    }
  }
}
</script>
<style scoped>
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
.wt {
  width: 100%;
  border: 1px solid #ccc;
}
</style>