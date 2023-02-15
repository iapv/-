<template>
  <div class="container">
    <div class="topnav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/dmdata' }"
          >DM数据</el-breadcrumb-item
        >
        <el-breadcrumb-item>添加DM</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form ref="from" :model="from" label-width="80px">
        <el-form-item label="头像">
          <div class="or">
            <el-upload
              class="upload-demo"
              action="api/upcover"
              :file-list="from.fileList"
              list-type="picture-card"
              multiple
              :on-success="handleFile"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="from.name" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="与小程序同步"
            v-model="from.intr"
            style="width: 290px"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="from.sex">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="from.age" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-input v-model="from.fm" placeholder="地区"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="from.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <div class="ybtn">
          <el-button type="success" @click="addm">确定</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

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
<script>
import global from "../components/Global.vue";
export default {
  data() {
    return {
      radio: 2,
      baseurl: global.baseUrl,
      imageurl: global.ImageUrl,

      from: {
        name: "",
        cover: "",
        sex: 1,
        intr: "",
        age: "",
        fm: "",
        phone: "",
        fileList: [],
      },
    };
  },
  methods: {
    handleFile(response, file, fileList) {
      this.from.fileList = fileList;
    },
    addm() {
      let from = new Object();
      from.name = this.from.name;
      from.sex = this.from.sex;
      from.intr = this.from.intr;
      from.age = this.from.age;
      from.fm = this.from.fm;
      from.phone = this.from.phone;
      let newFile = [];
      for (let i = 0; i < this.from.fileList.length; i++) {
        let res = "";
        if (this.from.fileList[i].response == null) {
          res = this.from.fileList[i].url.replace(this.imageurl, "");
        } else {
          res = this.from.fileList[i].response;
        }
        newFile.push(res);
      }
      from.files = newFile.join("&");
      this.$api.post("/addm", from, (response) => {
        if (response.status >= 200 && response.status < 300) {
          this.$message({
            message: "更改成功",
            type: "success",
          });
        }
      });
    },
    handleRemove(file, fileList) {
      this.from.fileList = fileList;
    },
  },
};
</script>