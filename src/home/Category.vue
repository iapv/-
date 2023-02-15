<template>
  <div class="container">
    <span class="tit">查看剧本类别</span>
    <span>*每添加一项都需要加上&</span>
    <el-form ref="form" label-width="80px" label-position="top">
      <el-form-item label="剧本题材">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4 }"
          placeholder="请输入内容"
          v-model="form.transfer"
          style="width: 360px"
          disabled
        >
        </el-input>
        <!-- <el-button
          type="success"
          icon="el-icon-check"
          circle
          style="margin-left: 13px"
          @click="submit('transfer')"
        ></el-button> -->
      </el-form-item>
      <el-form-item label="剧本背景">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4 }"
          placeholder="请输入内容"
          v-model="form.backgoup"
          style="width: 360px"
          disabled
        >
        </el-input>
        <!-- <el-button
          type="success"
          icon="el-icon-check"
          circle
          style="margin-left: 13px"
          @click="submit('backgoup')"
        ></el-button> -->
      </el-form-item>
      <el-form-item label="剧本类型">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4 }"
          placeholder="请输入内容"
          v-model="form.type"
          style="width: 360px"
          disabled
        >
        </el-input>
        <!-- <el-button
          type="success"
          icon="el-icon-check"
          circle
          style="margin-left: 13px"
          @click="submit('type')"
        ></el-button> -->
      </el-form-item>
      <el-form-item label="难度">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4 }"
          placeholder="请输入内容"
          v-model="form.diff"
          style="width: 360px"
          disabled
        >
        </el-input>
        <!-- <el-button
          type="success"
          icon="el-icon-check"
          circle
          style="margin-left: 13px"
          @click="submit('diff')"
        ></el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "category",
  created() {
    this.obtian("transfer");
    this.obtian("backgoup");
    this.obtian("type");
    this.obtian("diff");
  },
  data() {
    return {
      form: {
        transfer: "",
        backgoup: "",
        type: "",
        diff: "",
      },
    };
  },
  methods: {
    obtian(modelname) {
      this.$api.get("/cate/" + modelname, {}, (response) => {
        if (response.status >= 200 && response.status < 300) {
          let transferdata = [];
          for (let i = 0; i < response.data.length; i++) {
            transferdata.push(response.data[i].label);
          }
          switch (modelname) {
            case "transfer":
              this.form.transfer = transferdata.join("&");
              break;
            case "backgoup":
              this.form.backgoup = transferdata.join("&");
              break;
            case "type":
              this.form.type = transferdata.join("&");
              break;
            case "diff":
              this.form.diff = transferdata.join("&");
              break;
          }
        }
      });
    },
    submit(modelname) {
      // this.$api.post("/cate_add/" + modelname, this.form, (response) => {
      //   if (response.status >= 200 && response.status < 300) {
      //     if (response.data.code == 200) {
      //       this.$message({
      //         message: response.data.msg,
      //         type: "success",
      //       });
      //     }
      //   }
      // });
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
  margin-top: 40px;
}
</style>