<template>
  <div class="container">
    <div class="topnav">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/dmdata' }"
          >DM数据</el-breadcrumb-item
        >
        <el-breadcrumb-item>编辑DM</el-breadcrumb-item>
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
        <!-- <el-form-item label="绑定用户">
          <div class="wxuser" v-show="isbd">
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <span style="margin-left: 10px">用户名</span>
          </div>
          <el-button
            type="primary"
            round
            size="small"
            v-show="!isbd"
            @click="hoquuser"
            >绑定用户</el-button
          >
        </el-form-item> -->
        <div class="ybtn">
          <el-button type="success" @click="addm">确定</el-button>
          <el-button type="text" style="margin-left: 15px" v-show="isbd"
            >同步资料</el-button
          >
        </div>
      </el-form>
      <el-dialog title="绑定用户" :visible.sync="lo">
        <div class="uip">
          <ul>
            <li class="item" v-for="(item, index) in us" :key="index">
              <div
                class="box"
                :style="{ backgroundColor: line == index ? '#e8eaf6' : '#fff' }"
                @click="line = index"
              >
                <el-radio
                  v-model="line"
                  :label="line == index ? line : index"
                  @click="line = index"
                ></el-radio>
                <el-avatar :src="item.cover"></el-avatar>
                <span style="margin-left: 10px">{{ item.name }}</span>
              </div>
            </li>
          </ul>
          <div style="float: right">
            <el-button
              type="primary"
              round
              size="small"
              style="margin-top: -15px"
              >确定</el-button
            >
          </div>
        </div>
      </el-dialog>
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
      from: {
        name: "",
        cover: "",
        sex: 0,
        intr: "",
        age: "",
        fm: "",
        phone: 0,
        fileList: [],
      },
    };
  },
  created() {
    this.hoqu();
  },
  methods: {
    handleFile(response, file, fileList) {
      this.from.fileList = fileList;
      // this.files = this.files + "&" + response ;
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
      this.$api.post("/editdm/" + this.$route.params.id, from, (response) => {
        if (response.status >= 200 && response.status < 300) {
          if ((rep.data.errno == "0") && (rep.data.msg == "成功")) {
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
        "/Ajaxapi?action=getDmDetail",
        { id: this.$route.params.id },
        (rep) => {
          // query: {id:'1'}
          if (rep.status >= 200 && rep.status < 300) {
            // console.log(rep.data.sex);
            this.from.name = rep.data.name;
            this.from.intr = rep.data.intr;
            this.from.fm = rep.data.fm;
            this.from.phone = rep.data.phone;
            if (rep.data.sex == "男") {
              this.from.sex = 0;
            } else {
              this.from.sex = 1;
            }
            let fl = rep.data.cover.split("&");
            this.from.age = rep.data.age;
            let d = Array();
            for (let i = 0; i < fl.length; i++) {
              let attr = new Object();
              attr.id = i;
              if (fl[i].indexOf("http://") == -1) {
                attr.url = this.imageurl + fl[i];
              } else {
                attr.url = fl[i];
              }
              d.push(attr);
            }
            this.from.fileList = d;
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

