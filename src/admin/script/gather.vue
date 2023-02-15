<template>
  <div id="app">
    <div class="center">
      <div class="tit">
        <p>搜索剧本采集</p>
      </div>
      <div class="search_box">
        <el-input
          placeholder="请输入内容"
          v-model="search_value"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search()"
          ></el-button>
        </el-input>
      </div>
      <div class="content">
        <el-table :data="data" style="width: 100%" v-show="data.length > 0">
          <el-table-column prop="scriptName" label="名称" width="140">
          </el-table-column>
          <el-table-column prop="scriptPoster" label="封面" width="140">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.scriptPoster"
                style="width: 100px; height: 130px"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="scriptCategoryName" label="类型" width="100">
          </el-table-column>
          <el-table-column
            prop="scriptTextContent"
            label="简介"
            width="180"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="scriptTag" label="标签" width="140">
          </el-table-column>
          <el-table-column
            prop="scriptDifficultyDegreeName"
            label="难度"
            width="100"
          >
          </el-table-column>
          <el-table-column prop="playTime" label="时间" width="100">
          </el-table-column>
          <el-table-column prop="scriptMalePlayerLimit" label="男" width="80">
          </el-table-column>
          <el-table-column prop="scriptFemalePlayerLimit" label="女" width="80">
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="send(scope.$index, scope.row)"
                type="primary"
                >采集</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      search_value: "",
      data: [],
    };
  },
  methods: {
    search() {
      axios({
        url: "/gatherApi/gateway/res/client/script/list?pageNum=1&pageSize=10&playerLimitCondition==&scriptCategoryId=&scriptName="+this.search_value+"&scriptPlayerLimit=&scriptTag=",
        method: "get",
        params: {},
      }).then((rep) => {
        if (rep.status >= 200 && rep.status < 300) {
          this.data = rep.data.data;
          console.log(this.data.length);
        }
      });
    },
    send(index, data) {
      let from = new Object();
      from.name = data.scriptName;
      from.cover = data.scriptPoster;
      from.intr = data.scriptTextContent;
      from.man = data.scriptMalePlayerLimit;
      from.woman = data.scriptFemalePlayerLimit;
      let tran = data.scriptTag.split("@");
      from.tran = tran.join("&");
      from.type = data.scriptCategoryName;
      from.diff = data.scriptDifficultyDegreeName;
      from.playTime = data.playTime;
      from.scriptIntro = data.scriptIntro;
      from.figure = data.scriptImageContent;
      this.$api.post("/daorru", from, (rep) => {
        if (rep.data.msg == "采集成功") {
          this.$message({
            message: "采集成功",
            type: "success",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.tit p {
  color: #909090;
  font-size: 18px;
  font-weight: 600;
}
.search_box {
  width: 50%;
}
.el-input {
  height: 50px;
}
>>> .el-input__inner {
  height: 50px;
}
.content {
  width: 100%;
  margin-top: 20px;
}
</style>