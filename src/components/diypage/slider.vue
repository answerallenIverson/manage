<template>
  <div id="test">
    <div class="slider_box">
      <div class="block">
        <el-slider v-model="content.data.height" :max="30"></el-slider>
        <span v-text="content.data.height || 0 + 'px'"></span>
      </div>
      <div class="slider_end">
        <el-button size="mini" round @click="editSubmit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: {
        type: "slider",
        data: {
          height: 0
        }
      }
    }
  },
  data() {
    return {};
  },
  methods:{
    editSubmit() {
      this.$emit("submit");
    },
  }
};
</script>

<style scoped>
.slider_box {
  width: 250px;
  height: 50px;
}
.block {
  position: relative;
  padding-right: 50px;
}
.block > span {
  position: absolute;
  right: 0;
  display: block;
  top: 7px;
}
</style>