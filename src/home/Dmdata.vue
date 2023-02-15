<template>
  <div class="container">
    <div class="topnam">
      <el-button-group class="e9btn">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="rot"
          >添加主持人</el-button
        >
        <!-- <el-button type="primary" icon="el-icon-delete"></el-button> -->
      </el-button-group>
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

        <el-table-column label="头像" width="80" align="center">
          <template slot-scope="scope">
            <el-avatar
              :src="imageurl + scope.row.cover.split('&')[0]"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="昵称" align="center">
        </el-table-column>
        <el-table-column prop="intr" label="简介" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="性别" align="center">
          <template slot-scope="scope">
            <span style="color: #ee9ca7">{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" align="center">
        </el-table-column>
        <el-table-column label="会开的本" align="center">
          <template slot-scope="scope">
            <el-link :underline="false" @click="robo(scope.row)">{{
              scope.row.book_count
            }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="当前状态" align="center">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.staus"
              placeholder="请选择"
              size="small"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :change="handleStaus(scope.$index, scope.row)"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <router-view></router-view>
  </div>
</template>

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
}
.e9btn {
  float: right;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<script>
import global from "../components/Global.vue";
export default {
  name: "dm",
  data() {
    return {
      baseurl: global.baseUrl,
      imageurl: global.ImageUrl,
      tableData: [],
      options: [
        {
          value: "0",
          label: "上线",
        },
        {
          value: "1",
          label: "忙碌",
        },
        {
          value: "2",
          label: "下线",
        },
      ],
    };
  },
  created() {
    this.hoqu();
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({
        name: "editdm",
        params: { id: row.id },
      });
    },
    rot() {
      this.$router.push({
        name: "addm",
      });
    },
    hoqu() {
      this.$api.get("/Ajaxapi?action=getDmData", {}, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          this.tableData = rep.data;
        }
      });
    },
    handleStaus(index, row) {
      this.$api.post("/estaus", { id: row.id, staus: row.staus }, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
        }
      });
    },
    robo(row) {
      this.$router.push({
        name: "dmbook",
        params: { id: row.id },
      });
    },
    handleDelete(tab) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.post("/deleteDm", { id: tab.id }, (rep) => {
            if (rep.status >= 200 && rep.status < 300) {
              this.hoqu();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
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