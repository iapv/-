<template>
  <div id="app">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="会员折扣">
        <el-input-number
          v-model="form.num"
          :precision="1"
          :min="0.1"
          :max="1"
          :step="0.1"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <div class="ybtn" style="margin-left: 20px">
        <el-button type="success" @click="save" style="width: 120px"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        num: "0.0",
      },
    };
  },
  created() {
    if (localStorage.vipzk) {
      this.form.num = localStorage.vipzk;
    }
  },
  methods: {
    save() {
      localStorage.setItem("vipzk", parseFloat(this.form.num));
      this.$message({
        type: "success",
        message: "保存成功!",
      });
    },
  },
};
</script>