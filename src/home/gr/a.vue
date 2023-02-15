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

        <el-table-column
          fixed="right"
          label="当前状态"
          width="80"
          style="text-align: center"
        >
          <template slot-scope="scope">
            <el-tag type="success">{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="130">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row.id)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="opation(scope.row)" type="text" size="small">{{
              scope.row.status == "进行中"
                ? "结束"
                : scope.row.status == "正常"
                ? "开局"
                : scope.row.status == "待审核"
                ? "审核"
                : ""
            }}</el-button>
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
      this.$api.post("/getGropings", {}, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          this.tableData = rep.data.data;
        }
      });
    },
    opation(row) {
      if (row.status == "待审核") {
        this.$confirm("是否已经查阅此组局, 将通过审核?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.post("/nutie", { gid: row.id }, (rep) => {
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
      } else if (row.status == "正常") {
        this.$confirm("是否已经查阅此组局, 将开局?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.post("/startGrouping", { gid: row.id }, (rep) => {
              if (rep.status >= 200 && rep.status < 300) {
                if (rep.data.msg == "成功") {
                  this.hoqu();
                  this.$message({
                    type: "success",
                    message: "开局成功!",
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
              message: "已取消开局",
            });
          });
      } else if (row.status == "进行中") {
        this.$confirm("该组局是否已经结束?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            this.$api.post("/endGrouping", { gid: row.id }, (rep) => {
              if (rep.status >= 200 && rep.status < 300) {
                if (rep.data.msg == "成功") {
                  this.hoqu();
                  this.$message({
                    type: "success",
                    message: "结束组局成功!",
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
              message: "已取消结束",
            });
          });
      }
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