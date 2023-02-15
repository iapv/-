<template>
  <div id="app-control">
    <el-row>
      <el-col :sm="24">
        <div class="page-title-box">
          <div class="btn-group float-right">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/admin/index/control' }"
                >控制台</el-breadcrumb-item
              >
              <el-breadcrumb-item>数据分析</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <h4 class="page-title">数据分析</h4>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="6" :lg="6" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i></i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">0</h5>
                  <h5 class="mb-0 text-muted">已授权商家</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :lg="6" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i></i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">0</h5>
                  <h5 class="mb-0 text-muted">剧本库数据</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :lg="6" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i></i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">0</h5>
                  <h5 class="mb-0 text-muted">待处理订单</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :lg="6" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i></i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">V1.0</h5>
                  <h5 class="mb-0 text-muted">程序版本</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :sm="12">
        <div style="background-color: #ffff">
          <user-charts></user-charts>
        </div>
      </el-col>
      <el-col :sm="12">
        <div style="background-color: #ffff">
          <access-charts></access-charts>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import AccessCharts from '../../components/AccessCharts.vue';
import UserCharts from "../../components/UserCharts.vue";
export default {
  components: { UserCharts, AccessCharts },
  name: "control",
  data() {
    return {
      UserCharts,
      AccessCharts
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
@import url("./control.css");
</style>