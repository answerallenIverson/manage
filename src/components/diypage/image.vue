<template>
  <div id="test" ref="imageBox">
    <div class="image_box">
      <img src alt ref="img" />
      <div class="image_setting_box">
        <div class="image_chooseimg">
          <span>选择图片:</span>
          <el-button type="primary" size="mini" @click="editImage">选择图片</el-button>
          <input type="file" style="display: none" ref="ipt" @change="upLoadFile" />
        </div>
        <div class="image_choosesrc">
          <span>链接地址:</span>
          <template>
            <el-select size="mini" v-model="value" placeholder="请选择">
              <el-option
                size="mini"
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <el-input size="mini" placeholder="请输入内容" v-model="input" clearable style="width:194px"></el-input>
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
      flag:true,
      input: "",
      options: [
        {
          value: "选项1",
          label: "自定义链接"
        },
        {
          value: "选项2",
          label: "功能链接"
        }
      ],
      value: ""
    };
  },
  methods: {
    editImage() {
      this.$refs.ipt.click();
    },
    upLoadFile(e) {
      let url = window.URL.createObjectURL(e.target.files[0]);
      this.$refs.img.src = url;
      this.content.data.url = url;
    },
    imageSubmit() {
      this.$emit("submit");
    },
    imageClose(){
     this.$refs.imageBox.parentElement.style.display="none"
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
</style>