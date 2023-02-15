<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="120px" label-position="left">
      <el-form-item label="预约组局方式">
        <el-select v-model="form.yuy" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <div class="ybtn" style="margin-left: 40px">
        <el-button type="success" @click="save" style="width: 120px"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import global from "../../components/Global.vue";
import CompenTag from "../../components/CompenTag.vue";
export default {
  name: "BasicSet",
  created() {
    // this.hq();
  },
  data() {
    return {
      LogoFile: [],
      baseurl: global.baseUrl,
      imageurl: global.ImageUrl,
      form: {
        dmkg: "",
        yuy: "",
        textarea: "",
      },
      options: [
        {
          value: "0",
          label: "微信联系方式",
        },
        {
          value: "1",
          label: "组局方式",
        },
      ],
    };
  },
  methods: {
    save() {
      this.$api.post("/wxopation", { wxopation: this.form.yuy }, (response) => {
        if (response.status >= 200 && response.status < 300) {
          this.$message({
            message: "更改成功",
            type: "success",
          });
        }
      });
    },
    hoqu() {
      this.$api.get("/siteinfo", {}, (response) => {
        if (response.status >= 200 && response.status < 300) {
          this.form.yuy = response.data.data.wxopation;
        } else {
          console.log(response.message);
        }
      });
    },
  },
  created() {
    this.hoqu()
  }
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