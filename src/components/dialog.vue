<template>
  <el-dialog :center="true" title="选择图片" :visible="true" :modal="false">
    <el-radio-group @change="change" v-model="radioTag">
      <el-radio-button label="0">上传本地图片</el-radio-button>
      <input type="file" style="display: none" ref="ipt" @change="upLoadFile" />
      <el-radio-button label="1">选择图库图片</el-radio-button>
      <el-radio-button label="2">添加网络图片</el-radio-button>
    </el-radio-group>
    <!-- 弹出框内容 -->
    <div class="dialog_content" v-if="flag == 0">
      <el-button size="mini" @click="editImage" round>点击选择图片</el-button>
      <div class="imglist">
        <template v-for="(item, index) in imgList">
          <div class="dialog_img_box">
            <img :src="item" alt ref="img" />
            <i class="el-icon-close" @click="imgList.splice(index, 1)"></i>
          </div>
        </template>
      </div>
    </div>
    <div class="dialog_content" v-if="flag == 1">
      <div class="block" v-for="(link,index) in url" :key="index">
        <el-avatar class="dialog_image_item" shape="square" :fit="'cover'" :size="100" :src="link"></el-avatar>
        <el-radio v-model="radioChecked" :label="index">name</el-radio>
      </div>
      <!-- 分页 -->
      <div class="dialog_pagination">
        <el-pagination layout="prev, pager, next" :total="100"></el-pagination>
      </div>
    </div>
    <div class="dialog_content" v-if="flag == 2">
      <div class="dialog_editSrc">
        <el-input placeholder="请输入内容" v-model="input">
          <template slot="prepend">https://</template>
        </el-input>
      </div>
    </div>
    <!-- 弹出框底部 -->
    <div slot="footer" class="dialog-footer dialog_end">
      <el-button @click="save" size="mini" type="primary" round>保存</el-button>
      <el-button @click="quit" size="mini" round>取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      radioTag: "0",
      radioChecked: 0,
      url: [
        "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1823882937,2151172907&fm=26&gp=0.jpg",
        "http://img0.imgtn.bdimg.com/it/u=3768325835,1062552676&fm=214&gp=0.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1578031647223&di=966bf41f5899bd4ffcee0b99eaac26a8&imgtype=0&src=http%3A%2F%2Fpic.qqtn.com%2Fup%2F2017-11%2F15113197241733854.jpg",
        "http://b4-q.mafengwo.net/s10/M00/69/97/wKgBZ1nJ1QyAJK8dABaMTClzIeo201.gif?imageView2/2/w/600/q/90",
        "http://img3.duitang.com/uploads/item/201506/13/20150613193632_taLhJ.jpeg",
        "http://img2.woyaogexing.com/2017/08/16/66e3d7ee15493a54%21400x400_big.jpg"
      ],
      input: "",
      flag: 0,
      close: false,
      imgList: []
    };
  },
  methods: {
    change(val) {
      this.flag = val;  
    },
    editImage() {
      this.$refs.ipt.click();
      this.close = true;
    },
    upLoadFile(e) {
      if (!e.target.files.length) return;
      let url = window.URL.createObjectURL(e.target.files[0]);
      this.imgList.push(url);
    },
    save() {
      if (this.flag == 0) {
        this.$emit("save", this.imgList);
        this.imgList = [];
      } else if (this.flag == 1) {
        this.$emit("save", [this.url[this.radioChecked]]);
        this.imgList = [];
      }
    },
    quit() {
      this.$emit("quit");
    }
  }
};
</script>

<style scoped>
.dialog_content {
  width: 100%;
  height: 100%;
  padding-top: 10px;
  text-align: left;
}
.dialog_content >>> .block {
  display: inline-block;
  width: 20%;
}
.dialog_content >>> .dialog_image_item {
  display: block;
}
.dialog_content >>> .el-pagination {
  text-align: center;
}
.dialog_img_box {
  width: 100px;
  height: 100px;
  margin-top: 20px;
  position: relative;
}
.dialog_img_box > i {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  color: #fff;
}

.dialog_img_box > img {
  width: 100%;
  height: 100%;
}
.imglist {
  display: flex;
}


</style>