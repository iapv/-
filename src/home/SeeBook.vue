<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/add' }" 添加>剧本</el-breadcrumb-item>
      <el-breadcrumb-item>查看剧本</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      label-position="left"
      style="margin-top: 20px"
    >
      <el-form-item label="剧本名称">
        <el-input
          v-model="form.name"
          placeholder="请输入内容"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="剧本封面">
        <div class="or">
          <img
            :src="imageurl + form.cover"
            alt=""
            width="140px"
            height="170px"
          />
        </div>
      </el-form-item>
      <el-form-item label="剧本简介">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="与小程序同步"
          v-model="form.sub"
          disabled
        >
        </el-input>
      </el-form-item>
      <el-form-item label="人数">
        <el-input v-model="form.man" style="width: 120px" disabled>
          <template slot="prepend">男X</template>
        </el-input>
        <el-input v-model="form.woman" style="width: 120px" disabled>
          <template slot="prepend">女X</template>
        </el-input>
      </el-form-item>
      <el-form-item label="题材">
        <el-transfer
          :props="{
            key: 'label',
          }"
          v-model="form.value"
          :data="transferdata"
          :titles="['题材数据', '已选题材']"
        ></el-transfer>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.typera" size="small" disabled>
          <el-radio
            v-for="item in type"
            :label="item.label"
            border
            :key="item.key"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度">
        <el-radio-group v-model="form.diffva" size="small" disabled>
          <el-radio
            v-for="item in diff"
            :label="item.label"
            border
            :key="item.key"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="介绍图">
        <el-upload
          class="upload-demo"
          action="api/upwall"
          :file-list="form.fileList"
          list-type="picture-card"
          multiple
          :on-success="handleWall"
          :on-remove="handleRemove"
          disabled
        >
        </el-upload>
      </el-form-item>
      <div class="ybtn">
        <el-button type="success" @click="handlerives" style="width: 120px"
          >导入</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import global from "../components/Global.vue";
import seletdm from "../components/SeletDm.vue";
export default {
  name: "AddSc",
  components: {
    seletdm,
  },
  data() {
    return {
      baseurl: global.baseUrl,
      imageurl: global.ImageUrl,
      dialogTableVisible: false,
      transferdata: this.obtian("transfer"),

      backgoup: this.obtian("backgoup"),

      type: this.obtian("type"),

      diff: this.obtian("diff"),

      form: {
        name: "",
        sub: "",
        man: "3",
        woman: "4",
        price: "",
        value: [],
        diffva: "",
        tag: "无",
        typera: "",
        backradio: "",
        files: "",
        cover: "",
        fileList: [],
        tableData: [],
        multipleSelection: [],
      },
      options: global.options,
      value1: [],

      tags: [
        {
          key: 0,
          label: "无",
        },
        {
          key: 1,
          label: "上新",
        },
        {
          key: 2,
          label: "热门",
        },
        {
          key: 3,
          label: "爆款",
        },
        {
          key: 4,
          label: "推荐",
        },
      ],
    };
  },
  created() {
    this.hoqu();
  },
  methods: {
    handleFile(response, file, fileList) {
      console.log(response);
      this.form.cover = response;
    },
    handleWall(response, file, fileList) {
      this.form.fileList = fileList;
      this.form.files = response + "&" + this.form.files;
    },
    obtian(modelname) {
      let _this = this;
      this.$api.get("/cate/" + modelname, {}, (response) => {
        if (response.status >= 200 && response.status < 300) {
          switch (modelname) {
            case "transfer":
              const vh = (_) => {
                let data = [];
                for (let i = 0; i < 36; i++) {
                  data.push({
                    key: i,
                    label: `${response.data[i].label}`,
                    disabled: true,
                  });
                }
                return data;
              };

              _this.transferdata = vh();
              break;
            case "backgoup":
              _this.backgoup = response.data;
              break;
            case "type":
              _this.type = response.data;
              break;
            case "diff":
              _this.diff = response.data;
              break;
          }
        }
      });
    },
    handleSelectionChange(val) {
      this.form.multipleSelection = val;
    },
    clickHandleTab() {
      this.dialogTableVisible = false;
    },
    hoqu() {
      this.$api.post(
        "/getScriptDetail",
        { id: this.$route.params.id },
        (rep) => {
          if (rep.status >= 200 && rep.status < 300) {
            let data = rep.data;
            let f = this.form;
            f.multipleSelection = data.dm;
            f.name = data.name;
            f.cover = data.cover;
            f.sub = data.intr;
            f.man = data.man;
            f.woman = data.woman;
            f.value = data.tran.split("&");
            f.backradio = data.back;
            f.typera = data.type;
            f.diffva = data.diff;
            f.price = data.price;
            f.tag = data.tag;
            let d = Array();

            let fils = data.figure.split("&");

            for (let i = 0; i < fils.length; i++) {
              let attr = new Object();
              attr.id = i;
              attr.url = this.imageurl + fils[i];
              d.push(attr);
              // f.fileList.push(files)
            }
            f.fileList = d;
            console.log(d);
          }
        }
      );
    },
    handlerives() {
      this.$api.post(
        "/importbook",
        { token: localStorage.uxToken, id: this.$route.params.id },
        (rep) => {
          if (rep.status >= 200 && rep.status < 300) {
            if (rep.data.code == 20 && rep.data.msg == "导入成功") {
              this.$message({
                type: "success",
                message: "导入成功!",
              });
            } else {
              this.$message({
                type: "error",
                message: rep.data.msg,
              });
            }
          }
        }
      );
    },
    handleRemove(file, fileList) {
      this.form.fileList = fileList;
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
.el-input {
  width: 290px;
}
.or {
  display: flex;
  align-items: center;
}
.el-radio {
  margin-right: 0px;
}
.ybtn {
  margin-bottom: 40px;
  margin-left: 100px;
}
</style>