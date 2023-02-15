<template>
  <div class="container">
    <div class="topnav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/shopdata' }"
          >主题房间</el-breadcrumb-item
        >
        <el-breadcrumb-item>编辑房间</el-breadcrumb-item>
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
      imageurl: global.ImageUrl,
      form: {
        name: "",
        size: "",
        num: "",
        fileList: [],
        photo: "",
      },
    };
  },
  created() {
    this.hoqu();
  },
  methods: {
    handleWall(response, file, fileList) {
      this.form.fileList = fileList;
    },
    submit() {
      let from = new Object();
      from.id = this.$route.params.id
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
      this.$api.post("/editshop", from, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          if ((rep.data.errno == "0") & (rep.data.msg == "成功")) {
            this.$message({
              message: "编辑成功",
              type: "success",
            });
          } else {
            this.$message({
              message: rep.data.msg,
              type: "warning",
            });
          }
        }
      });
    },
    hoqu() {
      this.$api.post(
        "/Ajaxapi?action=getShopdeatil",
        { id: this.$route.params.id },
        (rep) => {
          if (rep.status >= 200 && rep.status < 300) {
            let d = rep.data.data;
            let fl = d.photo.split("&");
            let arrs = Array();
            for (let i = 0; i < fl.length; i++) {
              let attr = new Object();
              attr.id = i;
              if (fl[i].indexOf("http://") == -1) {
                attr.url = this.imageurl + fl[i];
              } else {
                attr.url = fl[i];
              }
              arrs.push(attr);
            }
            this.form.fileList = arrs;
            this.form.name = d.name;
            this.form.size = d.size;
            this.form.num = d.num;
          }
        }
      );
    },
    handleRemove(file, fileList) {
      this.from.fileList = fileList;
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