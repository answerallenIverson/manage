<style scoped>
#guyver {
  width: 100%;
  height: 100%;
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
.cube-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.cube-list > div {
  width: 400px;
  height: 400px;
  position: relative;
  border: 1px solid black;
}
.cube-list > div > div {
  position: absolute;
}
.cube_imgbox{
  background-size:100% 100% !important; 
}
</style>
<template>
  <div id="guyver" @mousemove="selecting" @mouseup="selectEnd">
    <div class="table" @mousedown.stop="selectStart" ref="table">
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
          <input type="file" @change="upLoadFile(index, $event)" style="display:none" />
          <img @click="deleteImage(index, $event)" src alt />
        </div>
      </template>
    </div>
    <button @click="submit">结束</button>
    <div class="cube-list">
      <template v-for="cube in cubeList">
        <div>
          <template v-for="item in cube">
            <div class="cube_imgbox"
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
</template>
<script>
export default {
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
      selected: [],
      start: [],
      cube: [],
      cubeList: []
    };
  },
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
    selectStart(e) {
      // 开始选中，获取框选的top和left
      this.maskStyle.top = e.y - this.$refs.table.getBoundingClientRect().top;
      this.maskStyle.left = e.x - this.$refs.table.getBoundingClientRect().left;
      this.start = [e.x, e.y];
    },
    selecting(e) {
      // 选中中，更改框选的width和height
      if (!this.start.length) return;
      this.maskStyle.width = e.x - this.start[0];
      this.maskStyle.height = e.y - this.start[1];
    },
    selectEnd() {
      // 选中结束，this.selected里是本次选择的结果
      this.pushCube();
      this.start = [];
      this.maskStyle = {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      };
    },
    addImage(e) {
      e.currentTarget.children[0].click();
    },
    //上传文件
    upLoadFile(index, e) {
      let url = window.URL.createObjectURL(e.target.files[0]);
      e.target.nextElementSibling.src = url;
      this.cube[index].image = url;
      console.log(this.cube);
    },
    //提交按钮
    submit() {
      for(let i in this.cube){
        if(!this.cube[i].image){
         alert('尚有格子未上传图片')
          return false
        }
      }
      this.cubeList.push(this.cube);
      console.log(this.cube,this.cubeList)
      this.cube = [];
    },
    //点击删除图片
    deleteImage(index, e){
      if (this.cube[index].image){
        (this.cube[index].image = ""),(e.target.src = "");
        e.stopPropagation()
      }
    },
    pushCube() {
      if (!this.start.length) return;
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
