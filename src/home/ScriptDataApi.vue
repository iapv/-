<template>
  <div>
    <p
      v-for="(item, index) in itemingtext"
      :key="index"
      :style="{ color: item == ress ? '#67C23A' : 'none' }"
    >
      <span> {{ item == ress ? ress : "正在导入" + item }}</span
      ><span v-show="item == ress">成功</span>
    </p>
    <el-button type="primary" @click="start(daolupage)">开始导入</el-button>
    <el-button type="primary">停止</el-button>
    <el-button type="primary" @click="start(daolupage+1)">下一页</el-button>
  </div>
</template>

<style scoped>
</style>

<script>
import axios from "axios";
import { mapState } from "vuex";
import {
		mapMutations
	} from "vuex"
export default {
  data() {
    return {
      tolo: 30,
      itemingtext: [],
      ress: "",
    };
  },
  computed: {
    ...mapState(["daolupage"]),
  },
  methods: {
    ...mapMutations(['setPage']),
    start(page) {
      let _than = this
      axios({
        url: "/search",
        method: "get",
        params: {
          pageNum: page,
          pageSize: this.tolo,
        },
      }).then((rep) => {
        let from = new Object();
        for (let i = 0; i < rep.data.data.length; i++) {
          let data = rep.data.data[i];
          this.itemingtext.push(data.scriptName);
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
          console.log(from);
          this.$api.post("/daorru", from, (rep) => {
            console.log(rep.data.name);
            this.ress = rep.data.name;
          });
        }
        _than.setPage(page)
        this.start(page+1)
      });
    },
  },
};
</script>