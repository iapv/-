<template>
  <div id="app">
    <el-row>
      <el-col :sm="24">
        <div class="page-title-box">
          <div class="btn-group float-right">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/admin/shop/shop' }"
                >商家管理</el-breadcrumb-item
              >
              <el-breadcrumb-item>全部商家</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <h4 class="page-title">全部商家</h4>
        </div>
      </el-col>
    </el-row>
    <el-row :sm="24">
      <div class="btn-group float-left" style="margin-bottom: 15px">
        <el-button-group>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="primary" icon="el-icon-delete">删除</el-button>
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="roterAdshop">添加</el-button>
        </el-button-group>
      </div>
    </el-row>
    <el-row>
      <el-col :lg="24">
        <el-table
          :data="tableData"
          style="width: 100%"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="id" label="ID" width="50">
          </el-table-column>
          <el-table-column prop="name" label="名称" width="120">
          </el-table-column>
          <el-table-column prop="appid" label="AppID" width="120">
          </el-table-column>
          <el-table-column prop="appkey" label="Appkey" width="120">
          </el-table-column>
          <el-table-column prop="password" label="密码" width="120">
          </el-table-column>
          <el-table-column prop="appsecret" label="秘钥" width="300">
          </el-table-column>
          <el-table-column prop="phone" label="手机号" width="120">
          </el-table-column>

          <el-table-column prop="expireTime" label="到期时间" width="120">
          </el-table-column>
           <el-table-column prop="startTime" label="创立时间" width="120">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="130">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                >下架</el-button
              >
              <el-button type="text" size="small">续期</el-button>
              <el-button type="text" size="small" @click="edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>

let app = require("./shop");
export default app

</script>

<style scoped>
@import url("./shop.css");
</style>