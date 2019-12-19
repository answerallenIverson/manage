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
              <div class="cubeOperation">
                <a @click="showActive" class="mfEdit">{{item.name}}</a>
                <a @click="removeActive" class="mfRemove">{{item.value}}</a>
              </div>
              <div class="cube_list">
                <template v-for="cube in cubeList">
                  <div>
                    <template v-for="item in cube">
                      <div
                        class="cube_imgbox"
                        :style="{
              top: item.top + 'px',
              left: item.left + 'px',
              width: item.width + 'px',
              height: item.height + 'px',
              background: 'url(' + item.image + ')',
            }"
                      ></div>
                    </template>
                  </div>
                </template>
              </div>
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
              <div class="form_cont">
                <div class="cube container-fluid">
                  <div id="guyver" @mousemove="selecting">
                    <div
                      class="table"
                      @mousedown.stop="selectStart"
                      @mouseup="selectEnd"
                      ref="table"
                    >
                      <template v-for="(itemX, x) of 4">
                        <template v-for="(itemY, y) of 4">
                          <div
                            :class="
              itemY >= select.rowS &&
              itemY <= select.rowE &&
              itemX >= select.colS &&
              itemX <= select.colE
                ? 'select'
                : ''
            "
                          ></div>
                        </template>
                      </template>
                      <div
                        class="mask"
                        :style="{
          top: maskStyle.top + 'px',
          left: maskStyle.left + 'px',
          width: maskStyle.width + 'px',
          height: maskStyle.height + 'px'
        }"
                      ></div>
                      <template v-for="(item, index) in cube">
                        <div
                          class="cube"
                          :style="{
            top: item.top + 'px',
            left: item.left + 'px',
            width: item.width + 'px',
            height: item.height + 'px',
            background: item.color
          }"
                          @mousemove.stop
                          @mousedown.stop
                          @mouseup.stop
                          @click="addImage"
                        >
                          <input
                            type="file"
                            @change="upLoadFile(index, $event)"
                            style="display:none"
                          />
                          <img @click="deleteImage(index, $event)" src alt />
                        </div>
                      </template>
                    </div>
                    <button @click="submit">结束</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <!-- 富文本 -->
          <div class="edit_box" style="display:none">
            <vue-wangeditor id="editor" width="400" height="300" :menus="editorOptions.menu"></vue-wangeditor>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import draggable from "vuedraggable";
import vueWangeditor from "vue-wangeditor";
export default {
  name: "dragDemo",
  components: {
    draggable,
    vueWangeditor
  },
  data() {
    return {
      flag: false,
      isDragging: false,
      listLeft: [
        {
          name: "编辑",
          value: "删除"
        }
      ],
      maskStyle: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      select: {
        rowS: 0,
        rowE: 0,
        colS: 0,
        colE: 0
      },
      editorOptions: {
        menu: [
          "bold",
          "underline", // 下划线
          "italic", // 斜体
          "strikethrough", // 中线
          "eraser", // 清空格式
          "forecolor", // 文字颜色
          "bgcolor",
          "alignleft", // 左对齐
          "aligncenter", // 居中
          "alignright",
          "fontfamily", // 字体
          "fontsize", // 字号
          "head" // 标题
        ]
      },
      selected: [],
      start: [],
      cube: [],
      cubeList: []
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
  // 侦听数据
  watch: {
    maskStyle: {
      handler(newVal) {
        this.selected = [];
        this.select.rowS = Math.ceil(newVal.left / 100);
        this.select.rowE = Math.ceil((newVal.left + newVal.width) / 100);
        this.select.colS = Math.ceil(newVal.top / 100);
        this.select.colE = Math.ceil((newVal.top + newVal.height) / 100);
        for (let i = 1; i < 5; i++) {
          for (let j = 1; j < 5; j++) {
            j >= this.select.rowS &&
            j <= this.select.rowE &&
            i >= this.select.colS &&
            i <= this.select.colE
              ? this.selected.push(i * 4 + j - 5)
              : "";
          }
        }
        // 选框更改时选中的方格会保存在this.selected里
      },
      deep: true
    }
  },
  methods: {
    //拖动列表的每一块
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element;
      const draggedElement = draggedContext.element;
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      );
    },
    //显示魔方
    show() {
      this.flag = true;
      this.listLeft.push({ name: "编辑", value: "删除" });
      let height = window.getComputedStyle(this.$refs.ipBody).height;
      console.log(height);
    },
    //删除创建的列表
    removeActive(key) {
      this.listLeft.splice(key, 1);
      this.flag = false;
    },
    //显示魔方
    showActive() {
      this.flag = true;
    },
    // 开始选中，获取框选的top和left ---mf
    selectStart(e) {
      this.maskStyle.top = e.y - this.$refs.table.getBoundingClientRect().top;
      this.maskStyle.left = e.x - this.$refs.table.getBoundingClientRect().left;
      this.start = [e.x, e.y];
    },
    // 选中中，更改框选的width和height ---mf
    selecting(e) {
      if (!this.start.length) return;
      this.maskStyle.width = e.x - this.start[0];
      this.maskStyle.height = e.y - this.start[1];
    },
    // 选中结束，this.selected里是本次选择的结果 ---mf
    selectEnd() {
      this.start = [];
      this.pushCube();
      this.maskStyle = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      };
    },
    //添加图片
    addImage(e) {
      e.currentTarget.children[0].click();
    },
    //上传图片
    upLoadFile(index, e) {
      let url = window.URL.createObjectURL(e.target.files[0]);
      e.target.nextElementSibling.src = url;
      this.cube[index].image = url;
    },
    //提交按钮
    submit() {
      for (let i in this.cube) {
        if (!this.cube[i].image) {
          alert("尚有格子未上传图片");
          return false;
        }
        this.cube[i].height *= 0.75;
        this.cube[i].width *= 0.75;
        this.cube[i].top *= 0.75;
        this.cube[i].left *= 0.75;
      }
      this.cubeList.push(this.cube);
      console.log(this.cube, this.cubeList);
      this.cube = [];
    },
    //点击删除图片
    deleteImage(index, e) {
      if (this.cube[index].image) {
        (this.cube[index].image = ""), (e.target.src = "");
        e.stopPropagation();
      }
    },
    pushCube() {
      let top = Math.floor(this.maskStyle.top / 100) * 100;
      let left = Math.floor(this.maskStyle.left / 100) * 100;
      let width =
        Math.ceil((this.maskStyle.width + this.maskStyle.left) / 100) * 100 -
        left;
      let height =
        Math.ceil((this.maskStyle.height + this.maskStyle.top) / 100) * 100 -
        top;
      for (let i = 0; i < this.cube.length; i++) {
        let cube1 = [left, top, left + width, top + height];
        let cube2 = [
          this.cube[i].left,
          this.cube[i].top,
          this.cube[i].left + this.cube[i].width,
          this.cube[i].top + this.cube[i].height
        ];
        if (
          !(
            cube1[0] >= cube2[2] ||
            cube1[1] >= cube2[3] ||
            cube1[2] <= cube2[0] ||
            cube1[3] <= cube2[1]
          )
        ) {
          console.log("重合了");
          return false;
        }
      }
      this.cube.push({ top, left, width, height, color: this.getColor() });
      console.log(this.cube);
    },
    //获取随机颜色
    getColor() {
      switch (Math.floor(Math.random() * 16)) {
        case 0:
          return "#CCCFFF";
        case 1:
          return "#CCFFFF";
        case 2:
          return "#CCEEFF";
        case 3:
          return "#CCFFEE";
        case 4:
          return "#CC33FF";
        case 5:
          return "#3366FF";
        case 6:
          return "#ABCDEF";
        case 7:
          return "#CC33FE";
        case 8:
          return "#CCEEFF";
        case 9:
          return "#EECCFF";
        case 10:
          return "#EE3399";
        case 11:
          return "#CC3366";
        case 12:
          return "#FF33CC";
        case 13:
          return "#FFEE33";
        case 14:
          return "#CC3E3E";
        case 15:
          return "#CC3939";
      }
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
.form_cube {
  width: 430px;
  height: 430px;
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
.table {
  width: 400px;
  height: 400px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
}
.table > div {
  width: 25%;
  height: 25%;
  box-sizing: border-box;
  border: 1px solid white;
  background: #cccccc;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.select {
  background: #428bca !important;
}
.mask {
  position: absolute;
  border: 1px dashed black;
  z-index: 99;
  background: rgba(255, 255, 255, 0.3) !important;
}
.cube {
  position: absolute;
  z-index: 199;
  cursor: pointer;
}
.cube > img {
  display: block;
  width: 100%;
  height: 100%;
}
.cube_list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.cube_list > div {
  width: 400px;
  height: 400px;
  position: relative;
  border: 1px solid transparent;
}
.cube_list > div:hover{
  border:1px dashed;
}
.cube_list > div > div {
  position: absolute;
}
.cube_imgbox {
  background-size: 100% 100% !important;
}
</style>