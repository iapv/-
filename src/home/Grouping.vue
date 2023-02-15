<template>
  <div id="app" style="margin: 10px">
    <div class="panel-heading">
      <div class="panel-lead">
        <em>组局管理</em>
        <p>{{info}}</p>
      </div>
    </div>
    <div class="navapp">
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="全部数据" name="first"></el-tab-pane>
        <el-tab-pane label="未审核" name="three"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="control">
      <router-view></router-view>
       
    </div>
   
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      info: '在此可以查看组局数据，编辑组局数据，可视化数据请以小程序为准'
    };
  },
  methods: {
    handleClick(tab, event) {
      if (tab.index == "0") {
        this.info = '在此可以查看组局数据，编辑组局数据，可视化数据请以小程序为准'
        this.$router.push({
          name: "groupingdata",
        });
      } else if (tab.index == "1") {
        this.info = '此处可以查看未审核数据，即审核通过组局、查看功能'
        this.$router.push({
          name: "noaudit",
        });
      } else if (tab.index == "2") {
        this.info = '此处可以查看未审核数据，即审核通过组局、查看功能'
        this.$router.push({
          name: "noaudit",
        });
      }else if (tab.index == "3") {
        this.info = '此处可以查看已失效数据，即审核通过组局功能'
        this.$router.push({
          name: "noaudit",
        });
      }else if (tab.index == "4") {
        this.info = '此处可以查看正在进行开本的数据，可以设置用户MVP功能'
        this.$router.push({
          name: "noaudit",
        });
      }
    },
  },
};
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