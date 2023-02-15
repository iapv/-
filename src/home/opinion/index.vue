<template>
  <div class="container" style="margin: 10px">
    <div class="panel-heading">
      <div class="panel-lead">
        <em>意见反馈</em>
        <p>在此可以查看用户反馈的内容，可视化数据请以小程序为准</p>
      </div>
    </div>
    <div class="navapp">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane label="全部数据" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <el-table
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column label="ID" width="50" align="center">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column label="用户ID" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.uid }}
          </template>
        </el-table-column>
        <el-table-column label="用户头像" width="120" align="center">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.user.cover"></el-avatar>
          </template>
        </el-table-column>

        <el-table-column label="用户昵称" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.user.name }}
          </template>
        </el-table-column>

        <el-table-column
          label="内容"
          width="120"
          align="center"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column label="DM评价" width="140" align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.dm_rate" :disabled="true"></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="店家评价" width="140" align="center">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.dj_rate" :disabled="true"></el-rate>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handlerives(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import global from "../../components/Global.vue";
export default {
  data() {
    return {
      imageurl: global.ImageUrl,
      activeName: "first",
      tableData: [],
    };
  },
  created() {
    this.hoqu();
  },
  methods: {
    hoqu() {
      this.$api.post("/getOpinionData", {}, (_) => {
        this.tableData = _.data.data;
      });
    },
    handlerives(tab) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.post("/deleteOpiniondata", { id: tab.id }, (rep) => {
            if (rep.status >= 200 && rep.status < 300) {
              if (rep.data.msg == "成功") {
                this.hoqu();
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message({
                  type: "info",
                  message: rep.data.msg,
                });
              }
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
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