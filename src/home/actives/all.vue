<template>
  <div id="app">
    <div class="topnam">
      <el-button-group class="e9btn">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="add()"
          >添加活动</el-button
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
            <el-avatar :src="imageurl + scope.row.thum"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="活动名称" align="center">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="结束时间" align="center" prop="endTime">
        </el-table-column>
        <el-table-column label="活动内容" align="center">
          <template slot-scope="scope">
            <el-link
              :underline="false"
              @click="
                (_) => {
                  (drawer = true), (form.content = scope.row.content);
                }
              "
              >查看内容</el-link
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <el-button size="mini" @click="bj(scope.row)">编辑</el-button>
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
    <div>
      <el-drawer
        title="添加活动"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size="100%"
      >
        <div class="mardown">
          <div
            class="btnmr"
            style="
              display: flex;
              justify-content: flex-end;
              margin-left: auto;
              margin-top: 10px;
              margin-right: 20px;
              margin-bottom: 20px;
            "
          >
            <el-button type="primary" @click="drawer = false">保存</el-button>
          </div>
          <mavon-editor
            v-model="form.content"
            :ishljs="true"
            ref="md"
            @imgAdd="$imgAdd"
          />
        </div>
      </el-drawer>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div class="bxn">
          <div class="up" style="margin-left: 20px; margin-bottom: 20px">
            <el-form ref="form" :model="form" label-width="40px">
              <el-form-item label="封面">
                <img :src="imageurl + form.thum" width="200px" height="100px" />

                <el-upload
                  class="upload-demo"
                  action="api/uplogo"
                  :show-file-lis="false"
                  :limit="1"
                  :on-success="handleFile"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item label="标题">
                <el-input
                  v-model="form.name"
                  placeholder="请输入内容"
                  style="width: 50%"
                ></el-input>
              </el-form-item>
              <el-form-item label="开始">
                <el-date-picker
                  v-model="form.startTime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束">
                <el-date-picker
                  v-model="form.endTime"
                  type="date"
                  placeholder="选择日期"
                  format="yyyy 年 MM 月 dd 日"
                  value-format="yyyy-MM-dd"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="内容">
                <el-button size="small" type="primary" @click="drawer = true"
                  >编写内容</el-button
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="send()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import global from "../../components/Global.vue";
import axios from "axios";
export default {
  data() {
    return {
      drawer: false,
      direction: "btt",
      imageurl: global.ImageUrl,
      dialogVisible: false,
      tableData: [],
      img_file: [],
      form: {
        name: "",
        startTime: "",
        endTime: "",
        thum: "",
        content: "",
      },
      isedit: false,
    };
  },
  created() {
    this.hoqu();
  },
  methods: {
    rot() {},
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleFile(response, file, fileList) {
      this.form.thum = response;
      console.log(response);
    },
    send() {
      if (this.isedit) {
        this.edit();
      } else {
        this.$api.post("/addActive", this.form, (rep) => {
          if (rep.status >= 200 && rep.status < 300) {
            console.log(rep.data);
            if (rep.data.msg == "添加数据成功") {
              this.$message({
                message: rep.data.msg,
                type: "success",
              });
              this.hoqu();
              this.drawer = false;
              this.dialogVisible = false;
            } else {
              this.$message({
                message: rep.data.msg,
                type: "error",
              });
            }
          }
        });
      }
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("file", $file);
      this.img_file[pos] = $file;
      axios({
        url: "/api/upimg",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((res) => {
        let _res = res.data;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, this.imageurl + _res);
      });
    },
    hoqu() {
      this.$api.get("/Ajaxapi?action=getActivesData", {}, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          this.tableData = rep.data.data;
        }
      });
    },
    edit() {
      this.$api.post("/editActive", this.form, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          if (rep.data.msg == "成功") {
            this.hoqu();
            this.$message({
              message: "编辑成功",
              type: "success",
            });
            this.drawer = false;
            this.dialogVisible = false;
          } else {
            this.$message({
              message: rep.data.msg,
              type: "error",
            });
          }
        }
      });
    },
    bj(scope) {
      this.isedit = true;
      this.dialogVisible = true;
      this.form = scope;
    },
    handleDelete(tab) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.post("/deleteActives", { id: tab.id }, (rep) => {
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
    add() {
      this.isedit = false;
      this.dialogVisible = true;
      this.form = {
        name: "",
        startTime: "",
        endTime: "",
        thum: "",
        content: "",
      };
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