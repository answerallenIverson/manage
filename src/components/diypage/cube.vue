<style scoped rel="stylesheet/scss">
#cube {
  width: 320px;
  height: 400px;
}
.table {
  width: 320px;
  height: 320px;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.tb-element {
  width: 320px;
  height: 320px;
  display: flex;
  flex-wrap: wrap;
}
.tb-element > div {
  width: 25%;
  height: 25%;
  box-sizing: border-box;
  border: 1px solid white;
  background: #cccccc;
  background-size: 100% 100%;
}
.select {
  background: #04a292 !important;
}
.mask {
  position: absolute;
  border: 1px dashed black;
  z-index: 99;
  background: rgba(255, 255, 255, 0.3) !important;
}
.tb-cube {
  width: 320px;
  height: 320px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
}
.cube {
  position: absolute;
  z-index: 199;
  cursor: pointer;
}
.cube_nodes{
  color: #04a292;
}
</style>
<template>
  <div id="cube" @mousemove="selecting">
    <div class="table" @mousedown.stop="selectStart" @mouseup="selectEnd" ref="table">
      <div class="tb-element">
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
      </div>
      <div
        class="mask"
        v-show="this.start.length"
        :style="{
          top: maskStyle.top + 'px',
          left: maskStyle.left + 'px',
          width: maskStyle.width + 'px',
          height: maskStyle.height + 'px'
        }"
      ></div>
      <div class="tb-cube">
        <template v-for="(item, index) in content.data.list">
          <div
            class="cube"
            :style="{
              top: item.top + 'px',
              left: item.left + 'px',
              width: item.width + 'px',
              height: item.height + 'px',
              backgroundImage: 'url(' + item.image + ')',
              backgroundColor: item.color,
              backgroundSize: '100% 100%'
            }"
            @mousemove.stop
            @mousedown.stop
            @click="editImage(index, $event)"
            @contextmenu.prevent="deleteCube(index)"
          >
            <input type="file" @change="upLoadFile(index, $event)" style="display:none" />
          </div>
        </template>
      </div>
    </div>
    <div class="cube_nodes">
      <p><i class="el-icon-warning" style="margin-right:5px"></i>拖动光标选择区域，选择完成后点击右键取消</p>
    </div>
    <div class="cube_end">
      <el-button @click="$emit('submit')" size="mini" round>提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: {
        type: "cube",
        data: {
          top: 320,
          bottom: 0,
          list: []
        }
      }
    }
  },
  data() {
    return {
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
      start: [],
      cubeWidth: 80,
      focusIndex: -1
    };
  },
  watch: {
    maskStyle: {
      handler(newVal) {
        this.select.rowS = Math.ceil(newVal.left / this.cubeWidth);
        this.select.rowE = Math.ceil(
          (newVal.left + newVal.width) / this.cubeWidth
        );
        this.select.colS = Math.ceil(newVal.top / this.cubeWidth);
        this.select.colE = Math.ceil(
          (newVal.top + newVal.height) / this.cubeWidth
        );
      },
      deep: true
    },
    "content.data.list": {
      handler(newVal) {
        let top = 320,
          bottom = 0;
        for (let i = 0; i < newVal.length; i++) {
          if (newVal[i].top < top) {
            top = newVal[i].top;
          }
          if (newVal[i].top + newVal[i].height > bottom) {
            bottom = newVal[i].top + newVal[i].height;
          }
        }
        this.content.data.top = -top;
        this.content.data.height = bottom - top;
      }
    }
  },
  methods: {
    selectStart(e) {
      this.maskStyle.top = e.y - this.$refs.table.getBoundingClientRect().top;
      this.maskStyle.left = e.x - this.$refs.table.getBoundingClientRect().left;
      this.start = [e.x, e.y];
    },
    selecting(e) {
      if (!this.start.length) return;
      this.maskStyle.width = e.x - this.start[0];
      this.maskStyle.height = e.y - this.start[1];
    },
    selectEnd() {
      this.pushCube();
      this.start = [];
      this.maskStyle = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      };
    },
    //添加图片
    editImage(index, e) {
      if (this.content.data.list[index].image) {
        let cube = this.content.data.list[index];
        cube.image = "";
        this.$set(this.content.data.list, index, cube);
      } else {
        this.focusIndex = index
        this.$emit("addImg")
      }
    },
    upLoadFile(imgList) {
      let cube = this.content.data.list[this.focusIndex];
      cube.image = imgList.length == 1 ? imgList[0] : imgList;
      this.$set(this.content.data.list, this.focusIndex, cube);
    },
    //点击删除图片
    deleteCube(index) {
      this.content.data.list.splice(index, 1);
    },
    pushCube() {
      if (!this.start.length) return;
      let top =
        Math.floor(this.maskStyle.top / this.cubeWidth) * this.cubeWidth;
      let left =
        Math.floor(this.maskStyle.left / this.cubeWidth) * this.cubeWidth;
      let width =
        Math.ceil(
          (this.maskStyle.width + this.maskStyle.left) / this.cubeWidth
        ) *
          this.cubeWidth -
        left;
      let height =
        Math.ceil(
          (this.maskStyle.height + this.maskStyle.top) / this.cubeWidth
        ) *
          this.cubeWidth -
        top;
      for (let i = 0; i < this.content.data.list.length; i++) {
        let cube1 = [left, top, left + width, top + height];
        let cube2 = [
          this.content.data.list[i].left,
          this.content.data.list[i].top,
          this.content.data.list[i].left + this.content.data.list[i].width,
          this.content.data.list[i].top + this.content.data.list[i].height
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
      this.content.data.list.push({
        top,
        left,
        width,
        height,
        color: this.getColor()
      });
    },
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
