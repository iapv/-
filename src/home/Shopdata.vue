<template>
  <div class="container">
    <div class="topnam">
      <el-button-group class="e9btn">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="rot"
          >添加房间</el-button
        >
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

        <el-table-column label="封面" width="80" align="center">
          <template slot-scope="scope">
            <el-image :src="imageurl + splitCover(scope.row.photo)"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称" align="center">
        </el-table-column>
        <el-table-column prop="size" label="房间大小" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="最多人数" align="center">
          <template slot-scope="scope">
            <span style="color: #ee9ca7">{{ scope.row.num }}</span>
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
              @click="handleDelete( scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import global from "../components/Global.vue";
export default {
  data() {
    return {
      baseurl: global.baseUrl,
      imageurl: global.ImageUrl,
      tableData: [],
    };
  },
  created() {
    this.hoqu();
  },
  methods: {
    rot() {
      this.$router.push({
        name: "addshop",
      });
    },
    hoqu() {
      this.$api.get("/getshopdata", {}, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          this.tableData = rep.data;
        }
      });
    },
    splitCover(data) {
      return data.split("&")[0];
    },
    handleEdit(index, row) {
      this.$router.push({
        name: "editshop",
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
          this.$api.post("/deleteShop", { id: tab.id }, (rep) => {
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


<style scoped>
.container {
  text-align: left;
}
.e9btn {
  float: right;
  margin-right: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.content {
  clear: right;
  margin-top: 20px;
}
</style>