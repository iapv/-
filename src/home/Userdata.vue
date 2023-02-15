<template>
  <div id="app">
    <el-table
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column label="ID" width="50" align="center">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column
        prop="openid"
        label="openid"
        align="center"
        width="150px"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="头像" width="120" align="center">
        <template slot-scope="scope">
          <el-avatar :src="scope.row.cover.split('&')[0]"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="昵称" align="center" width="120px">
      </el-table-column>
      <el-table-column
        prop="born"
        label="简介"
        show-overflow-tooltip
        width="120px"
      >
      </el-table-column>
      <el-table-column label="性别" align="center" width="120px">
        <template slot-scope="scope">
          <span style="color: #ee9ca7">{{ scope.row.sex=='0'?'女':'男' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" align="center" width="120px">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center" width="120px">
      </el-table-column>
      <el-table-column prop="form" label="地址" align="center" width="120px">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" align="center" width="120px">
      </el-table-column>
      <el-table-column
        prop="time"
        label="登录时间"
        align="center"
        width="120px"
      >
      </el-table-column>
      <el-table-column prop="ip" label="ip" align="center" width="120px">
      </el-table-column>
      <el-table-column
        prop="book_count"
        label="已玩的剧本"
        align="center"
        width="140px"
      >
      </el-table-column>
      <el-table-column label="操作" width="150px" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button size="mini" type="danger" @click="handlerives(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Rsa from "../utils/ras";
import global from "../components/Global.vue";
export default {
  data() {
    return {
      imageurl: global.ImageUrl,
      tableData: [],
      activeName: "first",
    };
  },
  created() {
    this.hoqu()
  },
  methods: {
    hoqu() {
      this.$api.get("/Ajaxapi?action=getUserData", {}, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          this.tableData = rep.data;
        }
      });
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "edituser",
        params: { uid: row.id, openid: row.openid },
      });
    },
    handlerives(tab) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.post(
            "/Ajaxapi?action=deleteUser",
            { id: tab.id, openid: Rsa.encrypt(tab.openid) },
            (rep) => {
              if (rep.status >= 200 && rep.status < 300) {
                if (rep.data.errno == 0 && rep.data.msg == "成功") {
                  this.hoqu();
                  this.$message({
                    type: "success",
                    message: "删除成功!",
                  });
                }
              }
            }
          );
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
</style>