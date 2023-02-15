<template>
  <div class="container">
    <span class="tit">基本设置</span>
    <el-form ref="form" :model="form" label-width="90px" label-position="left">
      <el-form-item label="站点名称">
        <el-input
          v-model="form.site_name"
          placeholder="与小程序同步"
        ></el-input>
      </el-form-item>
      <el-form-item label="门店Logo">
        <img
          :src="imageurl + form.sitelogo"
          alt=""
          width="100px"
          height="100px"
        />
        <el-upload
          class="upload-demo"
          action="api/uplogo"
          :show-file-lis="false"
          :limit="1"
          :on-success="handleFile"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="站点简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="与小程序同步"
          v-model="form.site_sub"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="站点公告">
        <el-input
          v-model="form.site_message"
          placeholder="与小程序同步"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="站长名称">
        <el-input
          v-model="form.siteer_name"
          placeholder="与小程序同步"
        ></el-input>
      </el-form-item> -->
      <el-form-item label="基础设施">
        <compen-tag ref="tag"></compen-tag>
      </el-form-item>
      <el-form-item label="微信二维码">
        <div class="or">
          <img :src="imageurl + form.wxer" alt="" width="140px" height="140px" />
          <el-upload
            class="upload-demo"
            action="api/upwxer"
            :show-file-lis="false"
            :limit="1"
            :on-success="handleWx"
          >
            <el-button style="margin-left: 15px" size="small" type="primary"
              >点击上传</el-button
            >
          </el-upload>
        </div>
      </el-form-item>
      <!-- <el-form-item label="微信号">
        <el-input v-model="form.wx_card" placeholder="与小程序同步"></el-input>
      </el-form-item> -->
      <el-form-item label="手机号码">
        <el-input v-model="form.phone" placeholder="与小程序同步"></el-input>
      </el-form-item>
        <el-form-item label="门店地址">
        <el-input v-model="form.longitude" placeholder="请输入经纬度"></el-input>
      </el-form-item>
      <div class="ybtn">
        <el-button type="success" @click="alter">确定</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import global from "../components/Global.vue";
import CompenTag from "../components/CompenTag.vue";
export default {
  name: "BasicSet",
  created() {
    this.hq();
  },
  data() {
    return {
      LogoFile: [],
      baseurl: global.baseUrl,
      imageurl: global.ImageUrl,
      
      form: {
        site_message: "",
        longitude: "",
        site_name: "",
        siteer_name: "",
        site_sub: "",
        wx_card: "",
        phone: "",
        sitelogo: "",
        wxer: "",
        basic: "",
      },
    };
  },
  components: {
    CompenTag,
  },
  methods: {
    handleFile(response, file, fileList) {
      console.log(response);
      this.form.sitelogo = response;
    },
    hq() {
      this.$api.get("/siteinfo", {}, (response) => {
        if (response.status >= 200 && response.status < 300) {
          this.form.sitelogo = response.data.data.site_logo;
          this.form.site_name = response.data.data.site_name;
          // this.form.siteer_name = response.data.data.siteer_name;
          let basic = response.data.data.basic;
          this.$refs.tag.dynamicTags = basic.split("&");
          this.form.wxer = response.data.data.wx_er;
          this.form.site_sub = response.data.data.site_sub;
          // this.form.wx_card = response.data.data.wx_card;
          this.form.site_message = response.data.data.site_message;
          this.form.phone = response.data.data.phone;
          this.form.longitude = response.data.data.longitude;
        } else {
          console.log(response.message);
        }
      });
    },
    handleWx(response, file, fileList) {
      if (response != "erro") {
        this.form.wxer = response;
      }
    },
    alter() {
      let tagdata = this.$refs.tag.dynamicTags;
      this.form.basic = tagdata.join("&");

      this.$api.post("/alter", this.form, (response) => {
        if (response.status >= 200 && response.status < 300) {
          this.$message({
            message: "更改成功",
            type: "success",
          });
          setTimeout("location.reload()", 800);
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  text-align: left;
  float: left;
  margin-left: 40px;
  overflow-x: auto;
}

.container .tit {
  display: block;
  font-size: 30px;
}
.el-form {
  margin-top: 30px;
}
.el-input {
  width: 290px;
}
.or {
  display: flex;
  align-items: center;
}
.ybtn {
  margin-bottom: 40px;
  text-align: center;
}
</style>