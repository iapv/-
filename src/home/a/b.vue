<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="120px" label-position="left">
      <el-form-item label="首页弹出公告">
        <el-switch
          v-model="form.dmkg"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
        <div v-show="form.dmkg">
          <div class="bt">
            <p>标题：</p>
            <el-input placeholder="输入公告标题" v-model="form.syggbt"> </el-input>
          </div>
          <div class="bt">
            <p>内容：</p>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="输入公告内容"
              v-model="form.syggcon"
            >
            </el-input>
          </div>
        </div>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import global from "../../components/Global.vue";
import CompenTag from "../../components/CompenTag.vue";
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
        dmkg: false,
        yuy: "1",
        textarea: "",
        syggbt: '',
        syggcon:''
      },
      options: [
        {
          value: "1",
          label: "微信联系方式",
        },
        {
          value: "2",
          label: "组局方式",
        },
      ],
    };
  },
  methods: {},
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
p {
  margin-bottom: 0px;
}
</style>