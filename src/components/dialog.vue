<template>
  <div class="dialog_box">
    <el-button @click="dialogVisible = true" border>打开嵌套表格的 Dialog</el-button>
    <el-dialog :center="true" title="选择图片" :visible.sync="dialogVisible">
      <el-radio-group @change="change" v-model="radioTag">
        <el-radio-button label="0">上传本地图片</el-radio-button>
        <input type="file" style="display: none" ref="ipt" @change="upLoadFile" />
        <el-radio-button label="1">选择图库图片</el-radio-button>
        <el-radio-button label="2">添加网络图片</el-radio-button>
      </el-radio-group>
      <!-- 弹出框内容 -->
      <div class="dialog_content" v-if="flag == 0">
        <el-button size="mini" @click="editImage" round>点击选择图片</el-button>
        <div v-if="close" class="dialog_img_box">
          <img src alt ref="img" />
          <i class="el-icon-close" @click="close = false"></i>
        </div>
      </div>
      <div class="dialog_content" v-if="flag == 1">
        <div class="block" v-for="(link,index) in url" :key="index">
          <el-avatar
            class="dialog_image_item"
            shape="square"
            :fit="'cover'"
            :size="100"
            :src="link"
          ></el-avatar>
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
        <el-button
          @click="dialogVisible = false ; close = false"
          size="mini"
          type="primary"
          round
        >保存</el-button>
        <el-button @click="dialogVisible = false ; close = false" size="mini" round>取消</el-button>
      </div>
    </el-dialog>
  </div>
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
        "http://img2.woyaogexing.com/2017/08/16/66e3d7ee15493a54%21400x400_big.jpg",
        "https://b-ssl.duitang.com/uploads/item/201507/01/20150701140308_yhm8f.jpeg",
        "http://b4-q.mafengwo.net/s10/M00/69/97/wKgBZ1nJ1QyAJK8dABaMTClzIeo201.gif?imageView2/2/w/600/q/90",
        "http://img3.duitang.com/uploads/item/201506/13/20150613193632_taLhJ.jpeg"
      ],
      input: "",
      flag: 0,
      close: false
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
      let url = window.URL.createObjectURL(e.target.files[0]);
      this.$refs.img.src = url;
    }
  }
};
</script>

<style scoped>
.dialog_box >>> .el-dialog__body {
  max-height: 550px;
  overflow-y: scroll;
}
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
  display: inline-block;
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
</style>