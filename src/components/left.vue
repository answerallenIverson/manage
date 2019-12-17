<template>
  <el-menu
    background-color="#333"
    text-color="#fff"
    active-text-color="#04A292"
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    style="width:201px"
    router
  >
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品</span>
      </template>
      <el-submenu index="1-1">
        <span slot="title">商品管理</span>
        <el-menu-item-group>
          <el-menu-item index="/user">添加商品</el-menu-item>
          <el-menu-item index="1-1-2">商品列表</el-menu-item>
          <el-menu-item index="1-1-3">商品导入</el-menu-item>
          <el-menu-item index="1-1-4">商品关注</el-menu-item>
          <el-menu-item index="1-1-5">预警货品</el-menu-item>
          <el-menu-item index="1-1-6">到货通知</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="1-2">
        <span slot="title">商品配置</span>
        <el-menu-item-group>
          <el-menu-item index="1-2-1" route="/user">商品分类</el-menu-item>
          <el-menu-item index="/prc">商品类型</el-menu-item>
          <el-menu-item index="1-2-3">商品品牌</el-menu-item>
          <el-menu-item index="1-2-4">商品规格</el-menu-item>
          <el-menu-item index="1-2-5">商品标签</el-menu-item>
          <el-menu-item index="1-2-6">商品标签</el-menu-item>
          <el-menu-item index="1-2-7">厂家管理</el-menu-item>
          <el-menu-item index="1-2-8">商品视频</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="1-3">
        <span slot="title">仓库管理</span>
        <el-menu-item index="1-3-1">仓库列表</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">订单</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">出库</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">营销</span>
    </el-menu-item>
    <el-menu-item index="5">
      <i class="el-icon-setting"></i>
      <span slot="title">店铺</span>
    </el-menu-item>
    <el-menu-item index="6">
      <i class="el-icon-setting"></i>
      <span slot="title">会员</span>
    </el-menu-item>
    <el-menu-item index="7">
      <i class="el-icon-setting"></i>
      <span slot="title">站点</span>
    </el-menu-item>

    <!-- 移动版导航栏 -->
    <el-submenu index="8">
      <template slot="title">
        <i class="el-icon-mobile"></i>
        <span slot="title">移动</span>
      </template>
      <el-submenu index="8-1">
        <span slot="title">站点设置</span>
        <el-menu-item-group>
          <el-menu-item index="8-1-1">站点信息</el-menu-item>
          <el-menu-item index="8-1-2">分类导航</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8-2">
        <span slot="title">页面管理</span>
        <el-menu-item-group>
          <el-menu-item index="/template1">页面设置</el-menu-item>
          <el-menu-item index="/template">首页模板</el-menu-item>
          <el-menu-item index="/aa">专题设置</el-menu-item>
          <el-menu-item index="8-2-4">页面分类</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8-3">
        <span slot="title">轮播广告</span>
        <el-menu-item-group>
          <el-menu-item index="8-3-1">店铺街</el-menu-item>
          <el-menu-item index="8-3-2">抢购</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-submenu>

    <el-menu-item index="9">
      <i class="el-icon-setting"></i>
      <span slot="title">APP</span>
    </el-menu-item>
    <el-menu-item index="10">
      <i class="el-icon-setting"></i>
      <span slot="title">财务</span>
    </el-menu-item>
    <el-menu-item index="11">
      <i class="el-icon-setting"></i>
      <span slot="title">统计</span>
    </el-menu-item>
    <el-menu-item index="12">
      <i class="el-icon-setting"></i>
      <span slot="title">系统</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>