<template>
  <div>
    <div class="ip_pre">
      <div class="ip_head"></div>
      <div ref="ipBody" class="ip_body">
        <div class="wx_head">
          <h1>鹊巢生活家</h1>
        </div>
        <div class="content">
          <diy-page ref="page" :options="pageOptions"></diy-page>
        </div>
      </div>

      <div class="plugin_add">
        <h4>添加模块</h4>
        <div class="plugin_list container-fluid" style="margin-bottom:30px;">
          <div class="row">
            <!-- 魔方 -->
            <div class="col-xs-6">
              <a href="javascript:;" @click="addItem('cube')">魔方</a>
            </div>
            <!-- 文字 -->
            <div class="col-xs-6">
              <a href="javascript:;" @click="addItem('text')">文字</a>
            </div>
            <!-- 商品 -->
            <div class="col-xs-6">
              <a href="javascript:;" @click="addItem('shop')">商品</a>
            </div>
            <!-- 图片 -->
            <div class="col-xs-6">
              <a href="javascript:;" @click="addItem('image')">图片</a>
            </div>
            <!-- 轮播广告 -->
            <div class="col-xs-6">
              <a href="javascript:;" @click="addItem('banner')">轮播广告</a>
            </div>
            <!-- 空白占位 -->
            <div class="col-xs-6">
              <a href="javascript:;" @click="addItem('slider')">空白占位</a>
            </div>
            <!-- 分割线 -->
            <div class="col-xs-6">
              <a href="javascript:;" @click="addItem('dashed')">分割线</a>
            </div>
            <!-- 图片导航 -->
            <div class="col-xs-6">
              <a href="javascript:;">图片导航</a>
            </div>
          </div>
        </div>
      </div>

      <div class="setting">
        <div class="upLoad">
          <el-button type="primary" size="mini" round @click="saveAllMod">立即发布</el-button>
        </div>
        <div class="save">
          <el-button type="primary" size="mini" round @click="save">保存草稿</el-button>
        </div>
      </div>

      <!-- 右边设置区域 -->
      <div v-show="pageOptions.method" class="edit_area" :style="{top: pageOptions.editTop + 'px'}">
        <diy-cube
          v-if="pageOptions.method == 'cube'"
          :content="pageOptions.content[pageOptions.pageIndex]"
          @submit="addItem('')"
        ></diy-cube>
        <diy-text
          v-else-if="pageOptions.method == 'text'"
          :content="pageOptions.content[pageOptions.pageIndex]"
          @submit="addItem('')"
        ></diy-text>
        <diy-shop
          v-else-if="pageOptions.method == 'shop'"
          :content="pageOptions.content[pageOptions.pageIndex]"
          @submit="addItem('')"
        ></diy-shop>
        <diy-image
          v-else-if="pageOptions.method == 'image'"
          @addImg="editCover='img'"
          :content="pageOptions.content[pageOptions.pageIndex]"
          @submit="addItem('')"
        ></diy-image>
        <diy-banner
          v-else-if="pageOptions.method == 'banner'"
          :content="pageOptions.content[pageOptions.pageIndex]"
          @submit="addItem('')"
        ></diy-banner>
        <diy-slider
          v-else-if="pageOptions.method == 'slider'"
          :content="pageOptions.content[pageOptions.pageIndex]"
          @submit="addItem('')"
        ></diy-slider>
        <diy-dashed
          v-else-if="pageOptions.method == 'dashed'"
          :content="pageOptions.content[pageOptions.pageIndex]"
          @submit="addItem('')"
        ></diy-dashed>
      </div>
    </div>

    <div class="edit-cover" v-show="editCover" @click="editCover=''">
      <div class="img-cover" v-show="editCover=='img'"></div>
    </div>
  </div>
</template>
<script>
import diyPage from "@/components/diypage/content";
import diyCube from "@/components/diypage/cube";
import diyText from "@/components/diypage/text";
import diyImage from "@/components/diypage/image";
import diyShop from "@/components/diypage/shop";
import diyBanner from "@/components/diypage/banner";
import diySlider from "@/components/diypage/slider";
import diyDashed from "@/components/diypage/dashed";
export default {
  components: {
    diyPage,
    diyCube,
    diyText,
    diyImage,
    diyShop,
    diyBanner,
    diySlider,
    diyDashed,
  },
  data() {
    return {
      isDragging: false,
      editList: [],
      pageOptions: {
        content: [],
        pageIndex: -1,
        method: "",
        editTop: 0
      },
      editCover: ""
    };
  },
  computed: {
    focusOn() {
      return this.pageOptions.content[this.pageOptions.pageIndex];
    }
  },
  methods: {
    saveAllMod() {
      this.$https.fetchPost("https://fanyi.baidu.com/", {
        ipCont: this.$refs.page.container.innerHTML,
        homePageId: 0,
        isIndexPage: true,
        wareIds: "",
        pageState: 1
      });
      console.log(this.$refs.page.container);
    },
    save() {},
    addItem(method) {
      if (this.testCube()) return;
      this.pageOptions.method = method;
      this.pageOptions.editTop = this.$refs.page.$el.offsetHeight + 180;
      switch (method) {
        case "cube":
          this.pageOptions.content.push({
            type: "cube",
            data: {
              top: 320,
              height: 0,
              list: []
            }
          });
          break;
        case "text":
          this.pageOptions.content.push({
            type: "text",
            data: { html: "" }
          });
          break;
        case "shop":
          this.pageOptions.content.push({
            type: "shop",
            data: {
              style: 0,
              list: []
            }
          });
          break;
        case "image":
          this.pageOptions.content.push({
            type: "image",
            data: { url: "" }
          });
          break;
        case "banner":
          this.pageOptions.content.push({
            type: "banner",
            data: {
              list: []
            }
          });
          break;
        case "slider":
          this.pageOptions.content.push({
            type: "slider",
            data: { height: 0 }
          });
          break;
        case "dashed":
          this.pageOptions.content.push({
            type: "dashed",
            data: {}
          }),
          this.pageOptions.method= "";
          break;
        default:
          return;
      }
      this.pageOptions.pageIndex = this.pageOptions.content.length - 1;
    },
    testCube() {
      if (!this.focusOn || this.pageOptions.method != "cube") return;
      if (!this.focusOn.data.list.length) {
        alert("魔方设置不能为空");
        return true;
      }
      for (let i = 0; i < this.focusOn.data.list.length; i++) {
        if (!this.focusOn.data.list[i].image) {
          alert("尚有格子未上传图片");
          return true;
        }
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
  color: #04a292;
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
  background-color: #04a292;
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
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  padding: 20px;
  overflow: hidden;
  margin-bottom: 20px;
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
.edit-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 399;
  background: rgba(0, 0, 0, 0.3);
}
.edit-cover > div {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
}
.setting {
  margin-bottom: 10px;
}
.upLoad,
.save {
  display: inline-block;
}
</style>
