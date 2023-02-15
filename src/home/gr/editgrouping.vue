<template>
  <div id="app">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/groupingdata' }"
        >全部数据</el-breadcrumb-item
      >
      <el-breadcrumb-item>编辑组局</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      label-position="left"
      style="margin-top: 20px"
    >
      <el-form-item label="剧本">
        <div style="text-align: left">
          <div style="font-size: 15px">{{ book.name }}</div>
          <img
            :src="imageurl + book.cover"
            alt=""
            width="120px"
            height="160px"
          />
          <div>
            <el-button type="primary" size="small" round @click="hoqubo()"
              >重新选择剧本</el-button
            >
          </div>
        </div>
      </el-form-item>
      <el-form-item label="预约时间">
        <el-date-picker
          v-model="value1"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="timestamp"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="主持人">
        <span>{{ dm.name == "null" ? "待定" : dm.name }}</span>
        <el-link icon="el-icon-edit">编辑</el-link>
        <span style="color: #e6a23c"
          >**为了避免未知错误，本版本暂不支持修改Dm**</span
        >
      </el-form-item>
      <el-form-item label="已加入用户">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名" width="100">
          </el-table-column>
          <el-table-column label="加入时间">
            <template slot-scope="scope">
              {{ scope.row.pivot.time }}
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="quiteuser(scope.row.id)"
                >{{ scope.row.id == creator ? "不可删除" : "删除" }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div style="color: #e6a23c">**暂不支持手动加入用户**</div>
      </el-form-item>
      <!-- <el-form-item label="是否反串">
        <el-switch
          v-model="isjs"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
        <span style="color: #e6a23c">**角色反串指的是男女都可加入,不受剧本限制**</span>
      </el-form-item> -->
      <el-form-item label="组局备注">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="与小程序同步"
          v-model="form.intr"
        >
        </el-input>
      </el-form-item>
      <div class="ybtn" style="margin-left: 90px">
        <el-button type="success" style="width: 120px" @click="set"
          >提交</el-button
        >
        <el-button
          type="primary"
          style="width: 120px"
          @click="opation(status)"
          >{{
            status == "进行中"
              ? "结束组局"
              : status == "正常"
              ? "开局"
              : status == "待审核"
              ? "审核"
              : "删除"
          }}</el-button
        >
      </div>
    </el-form>
    <el-dialog title="选择剧本" :visible.sync="lo">
      <div class="uip" style="padding-bottom: 10px">
        <ul>
          <li class="item" v-for="(item, index) in bo" :key="index">
            <div
              class="box"
              :style="{
                backgroundColor: line == index ? '#e8eaf6' : '#fff',
                display: 'flex',
                alignItems: 'center',
                height: '45px',
              }"
              @click="dx(index, item)"
            >
              <el-radio
                v-model="line"
                :label="line == index ? line : index"
                @click="dx(index, item)"
              ></el-radio>
              <span style="margin-left: 10px; display: inline-block">{{
                item.name
              }}</span>
            </div>
          </li>
        </ul>
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
    </el-dialog>
  </div>
</template>

<script>
import global from "../../components/Global.vue";
export default {
  data() {
    return {
      eltagtype: "success",
      page: 1,
      total: 0,
      radio: 2,
      line: null,
      imageurl: global.ImageUrl,
      mvp: "",
      creator: null,
      isjs: "",
      lo: false,
      form: {
        name: "",
        intr: "",
      },
      book: {
        id: "",
        cover: "",
        name: "",
      },
      dm: {
        id: "",
        name: "",
      },
      bo: [],
      value1: [],
      tableData: [],
      status: "",
    };
  },
  created() {
    this.hoqu();
  },
  methods: {
    hoqu() {
      this.$api.post(
        "/getGropingsdetail",
        { gid: this.$route.params.id },
        (rep) => {
          if (rep.status >= 200 && rep.status < 300) {
            let d = rep.data.data;
            this.status = d.status;
            this.form.intr = d.intr;
            this.book.id = d.book.id;
            this.book.cover = d.book.cover;
            this.book.name = d.book.name;
            if (d.dm != null) {
              this.dm.name = d.dm.name;
              this.dm.name = d.dm.id;
            }else {
               this.dm.name ='null';
              this.dm.name = 'null';
            }

            let arr = [];
            arr[0] = d.grouping_time * 1000;
            arr[1] = d.end_time * 1000;
            this.value1 = arr;
            this.tableData = d.user;
            this.creator = d.creator.id;
          }
        }
      );
    },
    hoqubo() {
      this.$api.get(
        "/Ajaxapi?action=getScriptData",
        { page: this.page },
        (rep) => {
          if (rep.status >= 200 && rep.status < 300) {
            this.bo = rep.data.data.data;
            this.total = rep.data.data.total;
            this.page = rep.data.data.current_page;
            this.lo = true;
          }
        }
      );
    },
    handleCurrentChange(val) {
      this.page = val;
      this.hoqubo();
    },
    dx(index, item) {
      this.line = index;
      this.book.id = item.id;
      this.book.name = item.name;
      this.book.cover = item.cover;
      this.lo = false;
    },
    set() {
      let obj = new Object();
      obj.id = this.$route.params.id;
      obj.book_id = this.book.id;
      obj.grouping_time = this.value1[0] / 1000;
      obj.end_time = this.value1[1] / 1000;
      obj.intr = this.form.intr;
      console.log(this.book.id);
      this.$api.post("/setGrouping", obj, (_) => {
        if (_.data.code == 200) {
          this.$message({
            message: "更改成功",
            type: "success",
          });
        } else {
          this.$message({
            message: "更改错误",
            type: "warning",
          });
        }
      });
    },
    opation(status) {
      const id = this.$route.params.id;
      if (status == "待审核") {
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
      } else if (status == "正常") {
        this.$confirm("是否已经查阅此组局, 将开局?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.post("/startGrouping", { gid: id }, (rep) => {
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
      } else if (status == "进行中") {
        this.$confirm("该组局是否已经结束?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.post("/endGrouping", { gid: id }, (rep) => {
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
      } else if (status == "已结束") {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$api.post("/deletegrouping", { gid: id }, (rep) => {
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
      }
    },
    quiteuser(uid) {
      const id = this.$route.params.id;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.post("/quiteuser", { gid: id, uid: uid }, (rep) => {
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
#app {
  margin: 20px;
}
.item {
  list-style: none;
}
</style>