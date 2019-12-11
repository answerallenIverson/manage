<template>
  <div style="background-color:#333; display:flex;align-items:center;justify-content:space-between">
    <div style="color:#fff;font-size:23px;margin-left:60px">鹊巢美博汇</div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#333"
      text-color="#fff"
      active-text-color="#04A292"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">切换账号</el-menu-item>
        <el-menu-item index="2-2">退出</el-menu-item>
        <!-- <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu> -->
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>