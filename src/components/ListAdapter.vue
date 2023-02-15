<template>

    <div class="grid-item">
      <div class="cover">
        <!-- <img
          src="../assets/bk.png"
          alt=""
          width="40px"
          height="40px"
          style="position: absolute; margin-top: -7px"
        /> -->

        <el-image
          style="width: auto; height: 170px"
          :src="src"
          :fit="fit"
        ></el-image>
      </div>
      <div class="con">
        <div class="tit">神秘区域</div>
      </div>
    </div>


</template>

<style scoped>

.grid-item {
  width: 120px;
  margin-bottom: 10px;
}
.tit {
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  border-radius: 10px;
}
.cover {
  position: relative;
  width: 120px;
  z-index: 999;
}
.cover .el-image {
  border-radius: 10px;
}
.el-image {
  position: relative;
  z-index: -1;
}
.con {
  text-align: center;
  padding: 4px;
}
</style>

<script>
export default {
  name: "ListAdapter",
  data() {
    return {
      src: "https://cdn.myanshi.cn/wp-content/uploads/2021/08/1630049276-45c48cce2e2d7fb.jpg?x-oss-process=image/auto-orient,1/interlace,1/resize,m_lfit,w_720,limit_0/quality,q_90/format,jpg/watermark,image_d3AtY29udGVudC91cGxvYWRzLzIwMjEvMDQvMTYxNzcxOTM2MC00NmMxN2ZmOGE1MjU4ZGYucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLFBfMzA,g_se,t_70,x_10,y_10",
      fit: "cover",
      isActive: false,
    };
  },
  methods: {
    mouseEnter() {
      this.isActive = true;
    },
    mouseOut() {
      this.isActive = false;
    },
  },
};
</script>