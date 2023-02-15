<template>
  <div id="app-control">
    <el-row>
      <el-col :sm="24">
        <div class="page-title-box">
          <div class="btn-group float-right">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>控制台</el-breadcrumb-item>
              <el-breadcrumb-item>数据分析</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <h4 class="page-title">数据分析</h4>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :md="6" :lg="7" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i class="el-icon-user"> </i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">{{ users }}</h5>
                  <h5 class="mb-0 text-muted">总会员数</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :lg="7" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i class="el-icon-box"></i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">{{ books }}</h5>
                  <h5 class="mb-0 text-muted">剧本库数据</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :lg="7" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i class="el-icon-postcard"></i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">{{ grs }}</h5>
                  <h5 class="mb-0 text-muted">总组局数</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :md="6" :lg="7" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i class="el-icon-mic"></i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">{{ dms }}</h5>
                  <h5 class="mb-0 text-muted">总DM数</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :lg="7" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i class="el-icon-files"></i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">{{ shops }}</h5>
                  <h5 class="mb-0 text-muted">主题房间数</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="6" :lg="7" :xl="3">
        <div class="card m-b-30">
          <div class="card-body">
            <div class="d-flex flex-row">
              <div class="col-3 align-self-center">
                <div class="round">
                  <i class="el-icon-mouse"></i>
                </div>
              </div>
              <el-col :span="12">
                <div class="m-l-10">
                  <h5 class="mt-0 round-inner">0</h5>
                  <h5 class="mb-0 text-muted">总点击量</h5>
                </div>
              </el-col>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-collapse v-model="activeNames" style="margin: 20px">
      <el-collapse-item title="基本设置" name="1">
        <div>一般修改的是小程序店家基本信息</div>
        <div>修改店家密码需要联系管理员，因为所有的密码都是加密过得</div>
      </el-collapse-item>
      <el-collapse-item title="组局" name="2">
        <div>因为微信费率问题，这个版本将不上线支付预约功能</div>
        <div>主要是因为微信退款提现机制，费率有点高</div>
      </el-collapse-item>
      <el-collapse-item title="剧本" name="3">
        <div>我们将在下个版本，添加更多剧本，现有剧本5000+</div>
        <div>可以在其他设置，设置剧本价格的会员折扣</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import AccessCharts from "../components/AccessCharts.vue";
import UserCharts from "../components/UserCharts.vue";
export default {
  components: { UserCharts, AccessCharts },
  name: "control",
  data() {
    return {
      users: 0,
      books: 0,
      grs: 0,
      dms: 0,
      shops: 0,
      activeNames: ["1"],
    };
  },
  created() {
    this.$api.get("/Ajaxapi?action=getdisposition", {}, (rep) => {
      if (rep.status >= 200 && rep.status < 300) {
        this.users = rep.data.data.wxuser_count;
        this.books = rep.data.data.script_count;
        this.shops = rep.data.data.room_count;
        this.dms = rep.data.data.compere_count;
        this.grs = rep.data.data.gr_count;
      }
    });
    this.$api.get("/Ajaxapi?action=likebook", {}, (rep) => {
      console.log(rep);
    });
  },
  methods: {},
};
</script>
<style scoped>
#app-control {
  margin-left: 20px;
}
.page-title-box {
  padding: 18px 0;
}

.btn-group {
  position: relative;

  margin-right: 15px;
}

.page-title-box .page-title {
  font-size: 20px;
  margin-bottom: 0;
  margin-top: 0;
}

h4 {
  line-height: 18px;
}

.card {
  border: none;
  box-shadow: 1px 0px 20px rgba(0, 0, 0, 0.05);
}

.m-b-30 {
  margin-bottom: 30px;
}

.card-body {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  padding: 1.25rem;
  background-color: #fff;
  border-radius: 25px;
}

.flex-row {
  -webkit-box-orient: horizontal !important;
  -webkit-box-direction: normal !important;
  -ms-flex-direction: row !important;
  flex-direction: row !important;
}

.d-flex {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
}

.col-3 {
  -webkit-box-flex: 0;
  -ms-flex: 0 0 25%;
  flex: 0 0 25%;
  max-width: 25%;
}

.round {
  line-height: 60px;
  color: #5b6be8;
  width: 60px;
  height: 60px;
  font-size: 26px;
  display: inline-block;
  font-weight: 400;
  border: 3px solid #ecf5ff;
  text-align: center;
  border-radius: 50%;
  background: #a0cfff;
}

.card {
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border-radius: 8px;
}

.m-l-10 {
  margin-left: 10px;
  text-align: center;
}

.round-inner,
.text-lightdark {
  color: #444444;
}

.text-muted {
  color: #707070 !important;
}
.el-col {
  position: relative;
  min-height: 1px;
  margin-right: 5px;
  margin-left: 5px;
  padding-left: 5px;
  padding-right: 5px;
}

.chartsbox {
  display: flex;
}
</style>