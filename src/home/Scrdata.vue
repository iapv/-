<template>
  <div class="container">
    <div class="panel-heading">
      <div class="panel-lead">
        <em>系统配置</em>
        <p>在此可以查看剧本数据，编辑剧本数据，可视化数据请以小程序为准</p>
      </div>
    </div>
    <div class="navapp">
      <el-tabs v-model="activeName" type="border-card" >
        <el-tab-pane label="全部剧本" name="first"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content">
      <el-input
        placeholder="请输入内容"
        v-model="input3"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchExistBook"
        ></el-button>
      </el-input>
      <div style="padding-top: 12px;clear: right;">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="id" label="ID"> </el-table-column>
          <el-table-column prop="name" label="名称" width="120">
          </el-table-column>
          <el-table-column
            prop="intr"
            label="简介"
            width="120"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="人数" width="120">
            <template slot-scope="scope">
              <span>{{ scope.row.man + scope.row.woman }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tran" label="题材" width="180">
          </el-table-column>
          <el-table-column prop="type" label="类型" width="120">
          </el-table-column>
          <el-table-column prop="diff" label="难度" width="120">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="120">
            <template slot-scope="scope">
              <span>{{
                scope.row.info.length == 0
                  ? scope.row.price
                  : scope.row.info[0].price
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="tag" label="标签" width="120">
            <template slot-scope="scope">
              <span>{{
                scope.row.info.length == 0
                  ? scope.row.tag
                  : scope.row.info[0].tag
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="playTime" label="时长" width="120">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="当前状态"
            width="80"
            style="text-align: center"
          >
            <template slot-scope="scope">
              <el-tag :type="eltagtype">{{ scope.row.state }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >编辑</el-button
              >
              <el-button
                type="text"
                @click="handlerives(scope.row)"
                size="small"
                >{{ operate(scope.row.state) }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="display: flex; justify-content: center">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  text-align: left;
  margin-left: 40px;
}
.container .tit {
  float: left;
  width: 180px;
  font-size: 30px;
}
.e9btn {
  float: right;
  margin-right: 20px;
}
.content {
  margin-top: 10px;
}

.el-input {
  width: 220px;
  float: right;
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
.wt {
  width: 100%;
  border: 1px solid #ccc;
}
</style>

<script>
import { HappyScroll } from "vue-happy-scroll";
import ListAdapter from "../components/ListAdapter.vue";
export default {
  name: "Scrdata",
  components: {
    ListAdapter,
    HappyScroll,
  },
  data() {
    return {
      input3: "",
      activeName: "first",
      tableData: [],
      eltagtype: "success",
      page: 1,
      total: 0,
    };
  },
  created() {
    this.hoqu();
    console.log(this.$store.state.isLogin);
  },
  methods: {
    handleClick(tab, event) {
      this.$router.push({
        name: "editbook",
        params: { id: tab.id },
      });
    },
    navad() {
      this.$root.$emit("next", "addsc");
    },
    hoqu() {
      this.$api.get(
        "/Ajaxapi?action=getScriptData",
        { page: this.page },
        (rep) => {
          if (rep.status >= 200 && rep.status < 300) {
            this.tableData = rep.data.data.data;
            this.total = rep.data.data.total;
            this.page = rep.data.data.current_page;
          }
        }
      );
    },
    handlerives(tab) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.post("/deletebook", { bid: tab.id }, (rep) => {
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
    operate(va) {
      if (va == "上架") {
        this.eltagtype = "success";
        return "删除";
      } else {
        this.eltagtype = "danger";
        return "上架";
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.hoqu();
    },
    searchExistBook() {
      if (this.input3 == "") {
        this.hoqu();
      } else {
        this.$api.post(
          "/Ajaxapi?action=searchExistBook",
          { name: this.input3 },
          (rep) => {
            if (rep.status >= 200 && rep.status < 300) {
              if (rep.data.msg == "查询数据成功") {
                this.$message({
                  type: "success",
                  message: "查询成功!",
                });
              }
              this.tableData = rep.data.data.data;
              this.total = rep.data.data.total;
              this.page = rep.data.data.current_page;
            }
          }
        );
      }
    },
  },
  computed: {},
};
</script>