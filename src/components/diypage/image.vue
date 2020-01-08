<template>
  <div id="test" ref="imageBox">
    <div class="image_box">
      <img src alt ref="img" />
      <div class="image_setting_box">
        <div class="image_chooseimg">
          <span>选择图片:</span>
          <el-button type="primary" size="mini" @click="editImage">选择图片</el-button>
        </div>
        <div class="image_notes">
          <p>
            <i class="el-icon-warning"></i>图片仅能选择一张，如需替换，再次点击添加图片即可替换
          </p>
        </div>
        <div class="image_choosesrc">
          <span>链接地址:</span>
          <template>
            <el-select @change="changed" size="mini" v-model="value1" placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <el-select v-if="!flag" size="mini" v-model="value2" placeholder="请选择">
            <el-option
              size="mini"
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-if="flag"
            size="mini"
            placeholder="请输入内容"
            v-model="input"
            clearable
            style="width:194px"
          ></el-input>
        </div>
        <div class="image_notes">
          <p>
            <i class="el-icon-warning"></i>建议图片宽度: 640px
          </p>
          <p>
            <i class="el-icon-warning"></i>支持图片格式: jpg,jpeg,png,bmp,gif
          </p>
        </div>
        <div class="image_confirm">
          <el-button @click="imageSubmit" size="mini" round>提交</el-button>
        </div>
        <div class="image_close">
          <el-button @click="imageClose" icon="el-icon-delete" size="mini" circle></el-button>
        </div>
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
        type: "image",
        data: {
          url: ""
        }
      }
    }
  },
  data() {
    return {
      flag: false,
      input: "",
      options1: [
        {
          value: "0",
          label: "自定义链接"
        },
        {
          value: "1",
          label: "功能链接"
        }
      ],
      options2: [
        {
          value: "1",
          label: "品牌"
        },
        {
          value: "2",
          label: "店铺"
        },
        {
          value: "3",
          label: "分类/商品"
        },
        {
          value: "4",
          label: "页面"
        },
        {
          value: "5",
          label: "分类列表"
        },
        {
          value: "6",
          label: "我的订单"
        },
        {
          value: "7",
          label: "购物车"
        },
        {
          value: "8",
          label: "账户中心"
        },
        {
          value: "9",
          label: "店铺街"
        },
        {
          value: "10",
          label: "抢购"
        }
      ],
      value1: "自定义链接",
      value2: ""
    };
  },
  methods: {
    editImage() {
      this.$emit("addImg");
    },
    upLoadFile(imgList) {
      let url = imgList.length == 1 ? imgList[0] : imgList;
      this.$refs.img.src = url;
      this.content.data.url = url;
    },
    imageSubmit() {
      this.$emit("submit");
    },
    imageClose() {
      this.$refs.imageBox.parentElement.style.display = "none";
    },
    changed(val) {
      this.flag = !this.flag;
    }
  }
};
</script>

<style scoped>
i {
  margin-right: 5px;
}
.image_box {
  width: 500px;
  text-align: left;
  overflow: hidden;
}
.image_setting_box {
  position: relative;
}
.image_chooseimg,
.image_choosesrc {
  margin: 30px 0;
}
.image_notes {
  color: #04a292;
}
.image_confirm {
  text-align: center;
}
.image_close {
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
}
.image_box > img {
  width: 100px;
  height: 100px;
}
</style>