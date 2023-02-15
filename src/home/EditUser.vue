<template>
  <div class="container">
    <div class="topnav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/userdata' }"
          >用户管理</el-breadcrumb-item
        >
        <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="content">
      <el-form ref="from" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="头像">
          <div class="or">
            <img :src="cover" alt="" width="140px" height="140px" />
            <el-upload
              class="upload-demo"
              action="api/upfm"
              :show-file-lis="false"
              :limit="1"
              :on-success="handleFile"
            >
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" placeholder="昵称"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="form.age" placeholder="年龄" type="number">
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="地区">
          <el-input v-model="form.form" placeholder="地区"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="手机号"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="邮箱">
          <el-input v-model="form.emial" placeholder="邮箱"></el-input>
        </el-form-item> -->
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
.wxuser {
  display: flex;
  align-items: center;
}
.item {
  list-style: none;
  margin-bottom: 5px;
}
.item .box {
  display: flex;
  align-items: center;
  height: 55px;
  padding: 7px;
}
</style>

<script>
import global from "../components/Global.vue";
// import rsa from '../util/hlz_rsa.js'
// const rsa = require('../util/hlz_rsa.js')
import Rsa from "../utils/ras";
export default {
  data() {
    return {
      radio: 2,
      line: null,
      lo: false,
      baseurl: global.baseUrl,
      imageurl: global.ImageUrl,
      isbd: false,
      us: [],
      xzuser: {
        name: "name",
        cover: "",
        id: 0,
      },
      cover: '',
      form: {
        name: "",
        sex: 0,
        age: 0,
        openid: "",
        id: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        age: [
          {
            type: "number",
            required: true,
            message: "请输入年龄",
            trigger: "blur",
          },
        ],
        phone: [
          {
            type: "string",
            min: 11,
            max: 11,
            message: "手机号长度11位",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {},
  created() {
    this.form.id = this.$route.params.uid;
    this.hoqu();
  },
  methods: {
    handleFile(response, file, fileList) {
      this.cover = response;
    },
    addm() {

      this.$api.post("/Ajaxapi?action=editUser", this.form, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          if (rep.data.errno == 0 && rep.data.msg == "更改成功") {
            this.$message({
              type: "success",
              message: rep.data.msg,
            });
          } else {
            this.$message({
              type: "error",
              message: rep.data.msg,
            });
          }
        }
      });
    },
    hoqu() {
      this.$api.post(
        "/Ajaxapi?action=getUserDetail",
        { uid: this.$route.params.uid, openid: this.$route.params.openid },
        (rep) => {
          // query: {id:'1'}
          if (rep.status >= 200 && rep.status < 300) {
            // console.log(rep.data.sex);
            this.form.name = rep.data.name;
            // this.form.intr = rep.data.intr;
            // this.form.emial = rep.data.emial;
            // this.form.phone = rep.data.phone;
            this.cover = rep.data.cover;
            this.form.sex = Number(rep.data.sex);
            this.form.age = Number(rep.data.age);
            // this.form.form = rep.data.form;
            // this.form.book = rep.data.book.length;
            this.form.openid = Rsa.encrypt(rep.data.openid);
          }
        }
      );
    },
    handleRemove(file, fileList) {
      this.from.fileList = fileList;
    },
    hoquuser() {
      this.$api.get("/Ajaxapi?action=getUserData", {}, (_) => {
        this.us = _.data;
        this.lo = true;
      });
    },
  },
};
</script>

