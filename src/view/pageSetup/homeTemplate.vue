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
              <div class="form_cont" >
                <div class="cube container-fluid" @click="initSelectBox('.form_cont')">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
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
    // 魔方框选
    initSelectBox(selector, selectCallback) {
      var radomNum = -1;
      function clearBubble(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
        } else {
          e.cancelBubble = true;
        }
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false;
        }
      }
      var $container = $(selector);
      //  框选事件
      $container
        .on("mousedown", function(eventDown) {
          //  设置选择的标识
          var isSelect = true;
          //  创建选框节点
          var $selectBoxDashed = $('<div class="select-box-dashed"></div>');
          $("body").append($selectBoxDashed);
          //  设置选框的初始位置
          var startX = eventDown.x || eventDown.clientX;
          var startY = eventDown.y || eventDown.clientY;
          $selectBoxDashed.css({
            left: startX,
            top: startY,
            position: "absolute",
            background: "#c3d5ed",
            border: "1px dashed #0099ff",
            opacity: 0.3
          });
          //  根据鼠标移动，设置选框宽高
          var _x = null;
          var _y = null;
          //  清除事件冒泡、捕获
          clearBubble(eventDown);
          //  监听鼠标移动事件
          radomNum++;
          console.log(radomNum);
          $(selector).on("mousemove", function(eventMove) {
            //  设置选框可见
            $selectBoxDashed.css("display", "block");
            //  根据鼠标移动，设置选框的位置、宽高
            _x = eventMove.x || eventMove.clientX;
            _y = eventMove.y || eventMove.clientY;
            //  暂存选框的位置及宽高，用于将 select-item 选中
            var _left = Math.min(_x, startX);
            var _top = Math.min(_y, startY);
            var _width = Math.abs(_x - startX);
            var _height = Math.abs(_y - startY);
            $selectBoxDashed.css({
              left: _left,
              top: _top,
              width: _width,
              height: _height
            });
            //  遍历容器中的选项，进行选中操作
            $(selector)
              .find(".cube span")
              .each(function() {
                var $item = $(this);
                var itemX_pos = $item.prop("offsetWidth") + $item.offset().left;
                var itemY_pos = $item.prop("offsetHeight") + $item.offset().top;
                //  判断 select-item 是否与选框有交集，添加选中的效果（ temp-selected ，在事件 mouseup 之后将 temp-selected 替换为 selected）
                var condition1 = itemX_pos > _left;
                var condition2 = itemY_pos > _top;
                var condition3 = $item.offset().left < _left + _width;
                var condition4 = $item.offset().top < _top + _height;
                if (condition1 && condition2 && condition3 && condition4) {
                  $item.addClass("temp_selected");
                  $item.attr("id", "randomBox" + radomNum);
                } else {
                  $item.removeClass("temp_selected");
                }
              });
            //  清除事件冒泡、捕获
            clearBubble(eventMove);
          });

          $(document).on("mouseup", function() {
            console.log(radomNum)
            $(selector).off("mousemove");
            $(selector)
              .find(".cube span")
              .removeClass("temp_selected")
              .removeClass("selected");
            $selectBoxDashed.remove();
            if (selectCallback) {
              selectCallback();
            }
          });
        })
        //  点选切换选中事件
        .on("click", ".cube span", function() {
          if ($(this).hasClass("selected")) {
            $(this).removeClass("selected");
          } else {
            $(this).addClass("selected");
          }
        });
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

.cube .temp_selected {
  background-color: #ddd;
}
</style>