<template>
  <div id="test">
    <div class="shop_box">
      <div class="shop_box_item">
        <el-radio v-model="content.data.style" :label="0">样式一</el-radio>
        <img src="../../assets/image/style_01.jpg" alt style="width:50%" />
      </div>

      <div class="shop_box_item">
        <el-radio v-model="content.data.style" :label="1">样式二</el-radio>
        <img src="../../assets/image/style_02.jpg" alt style="width:50%" />
      </div>

      <div class="shop_box_item">
        <el-radio v-model="content.data.style" :label="2">样式三</el-radio>
        <img src="../../assets/image/style_03.jpg" alt style="width:50%" />
      </div>
      <div class="shop_choose_shops">
        选择商品:
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :limit="4"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </div>
      <div class="shop_nodes">
        <p>
          <i class="el-icon-warning"></i>请选择商品，最多只能选择四个
        </p>
      </div>
      <div class="shop_end">
        <el-button @click="editSubmit" size="mini" round>提交</el-button>
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
        type: "cube",
        data: {
          style: 0,
          list: []
        }
      }
    }
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    shopSubmit() {},
    handleRemove(file) {
      for (let i = 0; i < this.content.data.list.length; i++) {
        if (this.content.data.list[i].uid == file.uid) {
          this.content.data.list.splice(i, 1);
        }
      }
      console.log(this.content.data);
    },
    handleSuccess(res, file) {
      this.content.data.list.push({
        uid: file.uid,
        url: file.url
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    editSubmit() {
      this.$emit("submit");
    },
    editImage(index, e) {
      console.log(1)
      if (this.content.data.list[index].image) {
        let cube = this.content.data.list[index];
        cube.image = "";
        this.$set(this.content.data.list, index, cube);
      } else {
        this.focusIndex = index;
        this.$emit("addImg");
      }
    }
  }
};
</script>

<style scoped>
.shop_box {
  width: 480px;
}
.shop_box_item {
  width: 50%;
  float: left;
  margin-bottom: 10px;
}
.shop_box_item:nth-child(3) {
  float: none;
}
.shop_choose_shops {
  float: left;
  width: 100%;
  text-align: left;
  line-height: 50px;
  padding-left: 34px;
}
.shop_choose_shops >>> .el-upload--picture-card {
  width: 80px;
  height: 80px;
  line-height: 80px;
}
.shop_choose_shops >>> .el-upload-list__item {
  width: 80px;
  height: 80px;
}
.shop_item_content {
  display: inline-block;
}
.shop_additem {
  width: 50px;
  height: 50px;
  border: 1px solid gray;
  border-radius: 10px;
  float: left;
  margin-left: 21px;
}
.shop_additem > i {
  margin-left: 37%;
  cursor: pointer;
}
.shop_additem > i:hover,
.shop_nodes {
  color: #04a292;
}
.shop_end {
  float: left;
  width: 100%;
}
</style>