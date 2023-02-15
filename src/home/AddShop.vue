<template>
  <div class="container">
    <div class="topnav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/shopdata' }"
          >主题房间</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加房间</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="房间名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="房间大小">
          <el-input placeholder="请输入整数" v-model="form.size">
            <template slot="append">平方</template>
          </el-input>
        </el-form-item>
        <el-form-item label="容纳人数">
          <el-input v-model="form.num"></el-input>
        </el-form-item>
        <el-form-item label="介绍图">
          <el-upload
            class="upload-demo"
            action="api/upwall"
            :file-list="form.fileList"
            list-type="picture-card"
            multiple
            :on-success="handleWall"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <div class="ybtn">
          <el-button type="success" @click="submit" style="width: 120px"
            >提交</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import global from "../components/Global.vue";
export default {
  data() {
    return {
      form: {
        name: "",
        size: "",
        num: "",
        fileList: [],
        photo: "",
      },
    };
  },
  methods: {
    handleWall(response, file, fileList) {
      this.form.fileList = fileList;
    },
    submit() {
      let from = new Object();
      from.name = this.form.name;
      from.size = this.form.size;
      from.num = this.form.num;
      let newFile = [];
      for (let i = 0; i < this.form.fileList.length; i++) {
        let res = "";
        if (this.form.fileList[i].response == null) {
          res = this.form.fileList[i].url.replace(this.imageurl, "");
        } else {
          res = this.form.fileList[i].response;
        }
        newFile.push(res);
      }
      from.photo = newFile.join("&");
      this.$api.post("/poshop", from, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          if ((rep.data.errno == "0") & (rep.data.msg == "添加数据成功")) {
            this.$message({
              message: "添加房间成功",
              type: "success",
            });
          } else if (rep.data.errno == "4003") {
            this.$message({
              message: rep.data.msg,
              type: "warning",
            });
          } else {
            this.$message({
              message: rep.data.data,
              type: "warning",
            });
          }
        }
      });
    },
  },
};
</script>
<style scoped>
.topnav {
  height: 40px;
  margin: 10px 0px 20px 20px;
}
.el-input {
  width: 290px;
}
.ybtn {
  width: 290px;
  margin-bottom: 40px;
  text-align: center;
}
</style>