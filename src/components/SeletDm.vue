<template>
  <div class="liscontainer">
    <div class="list">
      <p class="title">已选择DM</p>
      <div class="panel">
        <div class="group">
          <div class="item" v-for="(item,index) in datas" :key="index">
           
            <span style="margin-left: 10px">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import global from "./Global.vue";
export default {
  baseurl: "http://127.0.0.1:8000/",
  name: "SeletDm",
  props: ["datas"],
};
</script>
<style scoped>
.list {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  display: inline-block;
  vertical-align: middle;
  width: 200px;
  max-height: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
}
.title {
  height: 40px;
  line-height: 40px;
  background: #f5f7fa;
  margin: 0;
  padding-left: 15px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #000;
}
.panel {
  height: auto;
}
.group {
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: auto;
  overflow: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.item {
  display: flex;
  align-items: center;
  height: 30px;
  padding-left: 10px;
  margin-bottom: 10px;
}
</style>