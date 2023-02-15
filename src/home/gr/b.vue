<template>
  <div class="container">
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
        <el-table-column label="剧本ID" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.book.id }}
          </template>
        </el-table-column>
        <el-table-column label="剧本名称" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.book.name }}
          </template>
        </el-table-column>

        <el-table-column label="组局人数" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.minpope + scope.row.maxpope }}
          </template>
        </el-table-column>
        <el-table-column label="预约时间" width="140" align="center">
          <template slot-scope="scope">
            {{ timestampToTime(scope.row.grouping_time) }}
          </template>
        </el-table-column>
        <el-table-column label="截止时间" width="140" align="center">
          <template slot-scope="scope">
            {{ timestampToTime(scope.row.end_time) }}
          </template>
        </el-table-column>
        <el-table-column label="组局用户" width="140" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" @click="robo(scope.row)">{{
              scope.row.creator.name
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="已加入组局" width="140" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" @click="robo(scope.row)">{{
              scope.row.user.length
            }}</el-link>
          </template>
        </el-table-column>
         <el-table-column label="组局DM" width="140" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" @click="robo(scope.row)">{{
              scope.row.dm==null?'待定':scope.row.dm.name
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="120" align="center">
          <template slot-scope="scope">
            {{ scope.row.intr }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="当前状态"
          width="80"
          style="text-align: center"
        >
          <template slot-scope="scope">
            <el-tag type="info">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="nuite(scope.row.id)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="nuite(scope.row.id)" type="text" size="small"
              >审核</el-button
            >
            <el-button type="text" size="small" @click="handlerives(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="wz" style="color: #e6a23c;margin: 12px;">
      <p>**因为微信支付费率问题，我们思考许久，决定这版本将不使用支付上车功能**</p>
      <p>用户确认开局之前，在小程序上会弹出联系商家的选项</p>
    </div>
    

  </div>
</template>
<script>
import global from "../../components/Global.vue";

export default {

  data() {
    return {
      imageurl: global.ImageUrl,
      tableData: [],
    };
  },
  created() {
    this.hoqu();
  },
  methods: {
    timestampToTime(timestamp) {
      timestamp = timestamp ? timestamp : null;
      let date = new Date(timestamp * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m;
    },
    edit(id) {
      this.$router.push({
        name: "editgrouping",
        params: { id: id },
      });
    },
    handlerives(tab) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.post("/deletegrouping", { gid: tab.id }, (rep) => {
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
    hoqu() {
      this.$api.post("/noaudit/0", {}, (_) => {
        this.tableData = _.data.data;
      });
    },
    nuite(id) {
      this.$confirm("是否已经查阅此组局, 将通过审核?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.post("/nutie", { gid: id }, (rep) => {
            if (rep.status >= 200 && rep.status < 300) {
              if (rep.data.msg == "成功") {
                this.hoqu();
                this.$message({
                  type: "success",
                  message: "审核成功!",
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
            message: "已取消审核",
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
  margin-top: 12px;
}

.container .tit {
  float: left;
  width: 180px;
  font-size: 30px;
}
.content {
  clear: right;
  margin-top: 0px;
}
.e9btn {
  float: right;
  margin-right: 20px;
}
.topnam {
  height: 80px;
}
</style>