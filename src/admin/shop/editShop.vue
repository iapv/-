<template>
  <div id="app">
    <el-row>
      <el-col :sm="24">
        <div class="page-title-box">
          <div class="btn-group float-right">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/admin/index/shop' }"
                >全部商家</el-breadcrumb-item
              >
              <el-breadcrumb-item>添加商家</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <h4 class="page-title">添加商家</h4>
        </div>
      </el-col>
    </el-row>
    <div class="container">
      <el-row>
        <el-col :lg="6" :md="6" :sm="6" :xs="3">
          <el-form ref="form" :model="form" label-width="90px">
            <el-form-item label="商家名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="商家密码">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="小程序key">
              <el-input v-model="form.wxAppkey"></el-input>
            </el-form-item>
            <el-form-item label="小程序appsecret">
              <el-input v-model="form.appsecret"></el-input>
            </el-form-item>
            <!-- <el-form-item label="商家简介">
              <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 8 }"
                placeholder="与小程序同步"
                v-model="form.intr"
              >
              </el-input>
            </el-form-item> -->
            <el-form-item label="手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <!-- <el-form-item label="微信">
              <el-input v-model="form.wx"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="form.email"></el-input>
            </el-form-item> -->
            <el-form-item label="到期时间">
              <el-date-picker
                v-model="form.expireTime"
                type="date"
                align="right"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
            <div class="ybtn">
              <el-button type="success" style="width: 120px" @click="submit"
                >提交</el-button
              >
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
.page-title-box {
  padding: 18px 0;
}

.btn-group {
  position: relative;

  margin-right: 15px;
}

.page-title-box .page-title {
  font-size: 20px;
  margin-bottom: 0;
  margin-top: 0;
}

h4 {
  line-height: 18px;
}
.or {
  display: flex;
  align-items: center;
}
.ybtn {
  margin-bottom: 40px;
  margin-left: 100px;
}
</style>
<script>
import axios from "axios";
import global from "../../components/Global.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      ...mapState(["imgUrl"]),
      imageurl: global.ImageUrl,
      form: {
        name: "",
        expireTime: null,
        appid: "",
        appkey: "",
        password: "",
        wxAppkey: "",
        appsecret: "",
        intr: "",
        phone: "",
        wx: "",
        email: "",
        address: "",
        logo: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24;
        },
      },
    };
  },
  created() {
    this.hoqu()
  },
  methods: {
    generateAppid() {
      this.form.appid = Math.random().toString(36).slice(-10);
    },
    randomString() {
      let length = 32;
      let chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var result = "";
      for (var i = length; i > 0; --i) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }

      this.form.appkey = result;
    },

    submit() {
      this.$api.post("/business/editBus", this.form, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          if (rep.data.msg == "成功") {
            this.$message.success(rep.data.msg);
          }
        }
      });
    },
    uploadLogo(obj) {
      let fileobj = obj.file;
      const formData = new FormData();
      formData.append("file", fileobj);

      axios
        .post("/api/uploadlogo", formData)
        .then((data) => {
          this.form.logo = data.data;
        })
        .catch((response) => {
          console.log("图片上传失败");
        });
    },
    hoqu() {
      this.$api.post("/getBusDetail", { id: this.$route.params.id }, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          if (rep.data.msg == "查询数据成功") {
            this.form = rep.data.data
          }
        }
      });
    },
  },
};
</script>