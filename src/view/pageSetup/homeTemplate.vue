<template>
  <div>
    <div class="ip_pre">
      <div class="ip_head"></div>
      <div ref="ipBody" class="ip_body">
        <div class="wx_head">
          <h1>鹊巢生活家</h1>
        </div>
        <div class="dragDemo">
          <!--列表1-->
          <draggable
            class="list-group"
            element="div"
            v-model="listLeft"
            :options="dragOptions1"
            :move="onMove"
            @start="isDragging=true"
            @end="isDragging=false"
          >
            <div class="mfActive" v-for="(item,key) in listLeft" :key="key">
              <a @click="showActive" class="mfEdit">{{item.name}}</a>
              <a @click="removeActive" class="mfRemove">{{item.value}}</a>
            </div>
          </draggable>
        </div>
      </div>
      <div class="plugin_add">
        <h4>添加模块</h4>
        <div class="plugin_list container-fluid" style="margin-bottom:30px;">
          <div class="row">
            <!-- 魔方 -->
            <div class="col-xs-6">
              <a href="javascript:;" @click="show">魔方</a>
            </div>
            <!-- 文字 -->
            <div class="col-xs-6">
              <a href="javascript:;">文字</a>
            </div>
            <!-- 商品 -->
            <div class="col-xs-6">
              <a href="javascript:;">商品</a>
            </div>
            <!-- 图片 -->
            <div class="col-xs-6">
              <a href="javascript:;">图片</a>
            </div>
            <!-- 轮播广告 -->
            <div class="col-xs-6">
              <a href="javascript:;">轮播广告</a>
            </div>
            <div class="col-xs-6">
              <a href="javascript:;">全屏画报</a>
            </div>
            <div class="col-xs-6">
              <a href="javascript:;">空白占位</a>
            </div>
            <div class="col-xs-6">
              <a href="javascript:;">分割线</a>
            </div>
            <div class="col-xs-6">
              <a href="javascript:;">图片导航</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 魔方 -->
      <div ref="cubeEdit" v-if="flag" id="cubeEdit" class="edit_area cube_edit plugin_box">
        <div class="arrow"></div>
        <div class="edit_cont">
          <form id="mfFrom" role="form" class="form_cube">
            <div class="form_group cube_box">
              <div class="form_cont" @mousedown="mousedown">
                <div class="cube container-fluid">
                  <!-- <div class="cube_row"> -->
                  <div class="mask"></div>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <!-- </div> -->
                  <!-- <div class="cube_row"> -->
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <!-- </div> -->
                  <!-- <div class="cube_row"> -->
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <!-- </div> -->
                  <!-- <div class="cube_row"> -->
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import draggable from "vuedraggable";

export default {
  name: "dragDemo",
  components: {
    draggable
  },
  data() {
    return {
      flag: false,
      isDragging: false,
      left: 0,
      right: 0,
      listLeft: [
        {
          name: "编辑",
          value: "删除"
        }
      ]
    };
  },
  computed: {
    dragOptions1() {
      return {
        animation: 0,
        group: {
          name: "description",
          pull: "clone",
          put: false
        },
        ghostClass: "ghost"
      };
    },
    dragOptions2() {
      return {
        animation: 0,
        group: "description"
      };
    }
  },
  created: function() {},
  methods: {
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    show() {
      this.flag = true;
      this.listLeft.push({ name: "编辑", value: "删除" });
      let height = window.getComputedStyle(this.$refs.ipBody).height;
      console.log();
    },
    removeActive(key) {
      this.listLeft.splice(key, 1);
      this.flag = false;
    },
    showActive() {
      this.flag = true;
    },
    // 鼠标框选效果
    mousedown(e) {
      this.left = e.clientX;
      this.right = e.clientY;
      var createdMask = document.createElement("div");
      createdMask.className = "createdMask";
      createdMask.style.position = "absolute"
      createdMask.style.opacity = 0.3
      createdMask.style.top = e.clientX + "px";
      createdMask.style.left = e.clientY + "px";
      createdMask.style.background = "black"
      document.body.appendChild(createdMask);
      document.onmousemove = e => {
        createdMask.style.left = Math.min(e.clientX, this.left) + "px";
        createdMask.style.top = Math.min(e.clientY, this.right) + "px";
        createdMask.style.width = Math.abs(this.left - e.clientX) + "px";
        createdMask.style.height = Math.abs(this.right - e.clientY) + "px";
        
        console.log(e.clientX)
        console.log($('.cube span'))
      };
      document.onmouseup = e => {
        createdMask.remove();
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
};
</script>

<style scoped rel="stylesheet/scss">
* {
  font-size: 12px;
  font-weight: bold;
}
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
a {
  color: #428bca;
  text-decoration: none;
  outline: none;
}
.ip_pre {
  position: relative;
  width: 350px;
  border: 1px solid #e5e5e5;
  background: #fff;
  margin: 30px;
  border-radius: 18px 18px 0 0;
}
.ip_head {
  height: 70px;
  background: url(../../assets/image/iphone_head.png) no-repeat center center;
}
.ip_body {
  width: 320px;
  margin: 0 auto;
  padding-top: 11px;
}
.wx_head {
  width: 320px;
  height: 64px;
  background: url(../../assets/image/titlebar.png) no-repeat;
}
.wx_head h1 {
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  margin: 0;
  padding-top: 32px;
  text-align: center;
}
.dragDemo {
  display: flex;
  justify-content: center;
  color: #555;
}
.list-group {
  width: 320px;
  border: 1px solid #ddd;
  text-align: center;
}
.list-group > div {
  padding: 10px;
  border-bottom: 1px dashed #ddd;
}
.list-group img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
  padding-right: 10px;
}
.plugin_add {
  position: relative;
  width: 348px;
  border-top: 1px solid #e5e5e5;
  background: #f9f9f9;
  margin-top: 10px;
}
.plugin_add:before {
  top: -19px;
  border-bottom-color: #ddd;
}
.plugin_add:before,
.plugin_add:after {
  position: absolute;
  content: " ";
  border: 8px solid transparent;
  border-bottom-width: 10px;
  border-bottom-color: #f8f8f8;
  top: -18px;
  left: 167px;
}
.plugin_add h4 {
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: inherit;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}
.plugin_add {
  margin-right: auto;
  margin-left: auto;
}
.plugin_add .col-xs-6 {
  width: 25%;
  float: left;
  padding-right: 10px;
  margin-bottom: 10px;
}
.plugin_add .col-xs-6 a {
  display: block;
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  background: #fff;
  text-align: center;
  line-height: 40px;
  border-radius: 3px;
  box-sizing: border-box;
}
.plugin_add .col-xs-6 > a:hover {
  background-color: #428bca;
  color: #fff;
}
.row ::before {
  content: " ";
  display: table;
}

.plugin_list .row {
  padding-left: 10px;
}

.edit_area {
  position: absolute;
  left: 420px;
  width: 380px;
  top: 182px;
}
.edit_area .arrow,
.edit_area .arrow:after {
  width: 0px;
  height: 0px;
  border-style: solid;
  border-width: 8px 10px 8px 0;
  border-color: transparent #d1d1d1 transparent transparent;
  position: absolute;
  left: -10px;
  top: 19px;
}

.edit_area .edit_cont {
  float: left;
  padding: 12px 10px;
  min-height: 58px;
  background: #f8f8f8;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.form_cube,
.form_group,
.form_cont,
.cube,
.cube_row {
  float: left;
}

.container-fluid:before {
  content: " ";
  display: table;
}
.cube .row div {
  padding: 0 1px 1px 0;
}
.cube .row div span {
  display: block;
  width: 88px;
  height: 89px;
  background: #ccc;
  border-radius: 3px;
  cursor: pointer;
}
.mfActive {
  position: relative;
  width: 100%;
  height: 30px;
}
.mfEdit,
.mfRemove {
  cursor: pointer;
  position: absolute;
  z-index: 10;
  color: black;
}
.mfEdit {
  right: 40px;
}
.mfRemove {
  right: 10px;
}
.cube {
  position: relative;
  margin-right: auto;
  margin-left: auto;
}
.cube span {
  float: left;
  width: 80px;
  height: 80px;
  margin: 0 1px 1px 0;
  background: #cccccc;
}
.mask {
  position: absolute;
  z-index: 10;
  width: 90%;
  height: 100%;
}

</style>