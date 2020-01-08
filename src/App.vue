<template>
  <div id="app">
    <headerTop></headerTop>
    <section style="display:flex;flex:1;">
      <left></left>
      <article style="flex:1; padding:10px;overflow:hidden">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:10px 0 30px 0">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view></router-view>
      </article>
    </section>
  </div>
</template>

<script>
import headerTop from "./components/header";
import left from "./components/left";
export default {
  components: {
    headerTop,
    left
  },
 
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
  list-style: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
button{
  outline: none !important;
}
</style>
