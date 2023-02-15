<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/scriptdataa' }"
        >全部剧本</el-breadcrumb-item
      >
      <el-breadcrumb-item>编辑剧本</el-breadcrumb-item>
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
      <el-form-item label="标签">
        <el-radio-group v-model="form.tag" size="small">
          <el-radio
            v-for="item in tags"
            :label="item.label"
            border
            :key="item.key"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="主持DM">
        <el-button type="primary" @click="dialogTableVisible = true"
          >选择可以开此本的Dm</el-button
        >
        <el-dialog title="选择DM" :visible.sync="dialogTableVisible">
          <el-table
            border
            ref="multipleTable"
            :data="form.tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="ID" width="50" align="center">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>

            <el-table-column label="头像" width="80" align="center">
              <template slot-scope="scope">
                <el-avatar :src="imageurl + scope.row.cover"></el-avatar>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="昵称" align="center">
            </el-table-column>
            <el-table-column prop="intr" label="简介" show-overflow-tooltip>
            </el-table-column>
            <el-table-column label="性别" align="center">
              <template slot-scope="scope">
                <span style="color: #ee9ca7">{{ scope.row.sex }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄" align="center">
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="clickHandleTab">确 定</el-button>
          </div>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <seletdm
          :datas="form.multipleSelection"
          v-show="form.multipleSelection.length > 0"
        ></seletdm>
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
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="预定价格">
        <el-input
          v-model="form.price"
          placeholder="请输入内容"
          type="number"
        ></el-input>
      </el-form-item>
      <el-form-item label="VIP价格">
        <el-input
          v-model="form.vipprice"
          placeholder="请输入内容"
          type="number"
        ></el-input>
        <el-button type="text" style="margin-left: 12px" @click="vp"
          >启用会员折扣</el-button
        >
      </el-form-item>
      <div class="ybtn">
        <el-button type="success" @click="submit" style="width: 120px"
          >提交</el-button
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
        infoid: "",
        vipprice: "",
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
        {
          key: 5,
          label: "特色",
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
      this.$api.get("/Ajaxapi?action=getDmData", {}, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          this.form.tableData = rep.data;
        }
      });
      this.$api.post(
        "/Ajaxapi?action=getscriptDataDeatil",
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
            f.price = data.info[0].price;
            f.vipprice = data.info[0].vipprice;
            f.infoid = data.info[0].id;
            f.tag = data.info[0].tag;
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
    submit() {
      let dm = this.form.multipleSelection;
      let dmid = [];
      for (let i = 0; i < dm.length; i++) {
        if (dm[i].id != "undefined") {
          // dmid = dmid + dm[i].id + "&";
          dmid.push(dm[i].id);
        }
      }

      let form = new Object();
      // form.name = this.form.name;
      // form.cover = this.form.cover;
      // form.intr = this.form.sub;
      // form.man = Number(this.form.man);
      // form.woman = Number(this.form.woman);
      // form.tran = this.form.value.join("&");
      // form.back = this.form.backradio;
      // form.type = this.form.typera;
      // form.diff = this.form.diffva;

      // let newFile = [];
      // for (let i = 0; i < this.form.fileList.length; i++) {
      //   let res = "";
      //   if (this.form.fileList[i].response == null) {
      //     res = this.form.fileList[i].url.replace(this.imageurl, "");
      //   } else {
      //     res = this.form.fileList[i].response;
      //   }
      //   newFile.push(res);
      // }
      // form.figure = newFile.join("&");
      form.price = Number(this.form.price);
      form.vipprice = Number(this.form.vipprice);
      form.dmid = dmid;
      form.tag = this.form.tag;
      form.bid = this.$route.params.id;
      form.infoid = this.form.infoid;
      form.tagkey = 0;
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i]["label"] == this.form.tag) {
          form.tagkey = i;
        }
      }
      this.$api.post("/editbook", form, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          if (rep.data.code == 20 && rep.data.msg == "编辑成功") {
            this.$message({
              type: "success",
              message: "编辑成功!",
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
    handleRemove(file, fileList) {
      this.form.fileList = fileList;
    },
    vp() {
      if (localStorage.vipzk) {
        this.$message({
          message: "设置成功！可以在其他设置会员折扣",
          type: "success",
        });
        this.form.vipprice = Math.floor(this.form.vipprice * localStorage.vipzk);
      } else {
         this.$message({
          message: "没有设置会员折扣!可以在其他设置会员折扣",
          type: "warning",
        });
      }
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