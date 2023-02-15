<template>
  <div class="container">
    <div class="topnam">
      <span class="tit">全部剧本</span>
    </div>
    <el-form
      ref="form"
      :model="form"
      label-width="90px"
      label-position="left"
      style="margin-top: 20px"
    >
      <el-form-item label="剧本名称">
        <el-input v-model="form.name" placeholder="请输入内容"></el-input>
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
            action="api/upcover"
            :show-file-lis="false"
            :limit="1"
            :on-success="handleFile"
          >
            <el-button style="margin-left: 15px" size="small" type="primary"
              >点击上传</el-button
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
        >
        </el-input>
      </el-form-item>
      <el-form-item label="人数">
        <el-input v-model="form.man" style="width: 120px">
          <template slot="prepend">男X</template>
        </el-input>
        <el-input v-model="form.woman" style="width: 120px">
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
      <el-form-item label="背景">
        <el-radio-group v-model="form.backradio" size="small">
          <el-radio
            v-for="item in backgoup"
            :label="item.label"
            border
            :key="item.key"
            >{{ item.label }}</el-radio
          >
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.typera" size="small">
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
        <el-radio-group v-model="form.diffva" size="small">
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
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="预定价格">
        <el-input v-model="form.price" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-dialog title="选择DM" :visible.sync="srrcar">
          <el-input
            placeholder="请输入内容"
            v-model="searchtext"
            class="input-with-select"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
          <el-table
            ref="multscrdata"
            :data="scrdata"
            tooltip-effect="dark"
            style="width: 100%"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column type="indexs" width="55"> </el-table-column>
            <el-table-column label="ID" width="200" align="center">
              <template slot-scope="scope">{{ scope.row.scriptId }}</template>
            </el-table-column>

            <el-table-column label="封面" width="80" align="center">
              <template slot-scope="scope">
                <el-image :src="scope.row.scriptCoverUrl"></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="scriptName" label="" align="center">
            </el-table-column>
            <el-table-column
              prop="scriptTextContent"
              label="简介"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table>
          <!-- <div slot="footer" class="dialog-footer">
            <el-button @click="srrcar = false">取 消</el-button>
            <el-button type="primary" @click="intserinfo">确 定</el-button>
          </div> -->
        </el-dialog>
      </el-form-item>
      <div class="ybtn">
        <el-button type="primary" style="width: 100px" @click="saveForm"
          >保存草稿</el-button
        >
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
import axios from "axios";
import requst from "../requst";
console.log(global);
export default {
  name: "AddSc",
  components: {
    seletdm,
  },
  data() {
    return {
      dialog: false,
      baseurl: global.baseUrl,
      imageurl: global.ImageUrl,
      dialogTableVisible: false,
      transferdata: this.obtian("transfer"),
      srrcar: false,
      scrdata: [],
      multscrdata: [],
      backgoup: this.obtian("backgoup"),

      type: this.obtian("type"),

      diff: this.obtian("diff"),
      searchtext: "",
      currentRow: null,
      form: {
        name: "",
        sub: "",
        man: "3",
        woman: "4",
        price: "",
        value: [],
        diffva: "",
        typera: "",
        backradio: "",
        files: "",
        cover: "",
        tag: "无",
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
          console.log(response.data);
          switch (modelname) {
            case "transfer":
              _this.transferdata = response.data;
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
      let draft = this.$store.state.form;
      if (draft.name != null) {
        this.open(draft);
      }
      console.log(this.$store.state.form);
      this.$api.get("/Ajaxapi?action=getDmData", {}, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          this.form.tableData = rep.data;
        }
      });
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
      form.name = this.form.name;
      form.cover = this.form.cover;
      form.intr = this.form.sub;
      form.man = Number(this.form.man);
      form.woman = Number(this.form.woman);
      form.tran = this.form.value.join("&");
      form.back = this.form.backradio;
      form.type = this.form.typera;
      form.diff = this.form.diffva;
      form.price = Number(this.form.price);
      form.dmid = dmid;
      form.tag = this.form.tag;
      let newFile = [];
      for (let i = 0; i < this.form.fileList.length; i++) {
        let res = "";
        if (this.form.fileList[i].response == null) {
          res = this.form.fileList[i].url.replace(this.imageurl, "");
        } else {
          res = this.form.fileList[i].response;
        }
        newFile.push(res);
      }
      form.figure = newFile.join("&");
      this.$api.post("/addbook", form, (rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          if (rep.data.code == 200) {
            this.$message({
              type: "success",
              message: "添加成功!",
            });
          }else {
            this.$message({
              type: "success",
              message: rep.data.msg,
            });
          }
        }
      });
    },
    saveForm() {
      this.$store.commit("changeFrom", this.form);
      //  this.$store.commit('sub')
      console.log(this.$store);
    },
    open(draft) {
      this.$confirm("检测到有未完成的内容是否继续", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      }).then(() => {
        this.form = draft;
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(val);
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
.container .tit {
  float: left;
  width: 180px;
  font-size: 30px;
}
.e9btn {
  float: right;
  margin-right: 20px;
}

.topnam {
  height: 80px;
  display: flex;
  align-items: center;
}
</style>