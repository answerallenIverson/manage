<template>
  <div id="test">
    <div class="banner_box">
      <div class="banner_image_list">
        <template v-for="(item, index) in content.data.list">
          <li class="banner_list_item" ref="item">
            <img :src="item.image" alt ref="img" />
            <span>链接地址：</span>
            <el-select v-model="value1" size="mini" placeholder="功能链接" style="width:150px">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-select
              v-if="!flag"
              v-model="value2"
              size="mini"
              placeholder="请选择"
              style="width:150px"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-if="flag"
              v-model="input"
              size="mini"
              style="width:150px;"
              placeholder="请输入内容"
            ></el-input>
            <el-button icon="el-icon-delete" circle size="mini" @click="deleteItem"></el-button>
          </li>
        </template>
      </div>
      <div class="banner_chooseimg">
        <el-button type="primary" size="mini" @click="editImage">选择图片</el-button>
      </div>
      <div class="banner_node">
        <p>建议图片宽度: 640px 支持图片格式: jpg,jpeg,png,bmp,gif</p>
      </div>
      <div class="banner_end">
        <el-button size="mini" round @click="editSubmit">提交</el-button>
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
        type: "banner",
        data: {
          list: []
        }
      }
    }
  },
  data() {
    return {
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
      value1: "",
      value2: "",
      input: "",
      flag: false
    };
  },
  methods: {
    editImage() {
      this.$emit("addImg");
    },
    upLoadFile(imgList) {
      console.log(imgList)
      let url = imgList
      if (this.content.data.list.length < 4) {
          this.content.data.list.push({
            link: "",
            image: url,
            height:370,
          })
        }else{
          alert("最多选择4张哦")
        }
    },
    deleteItem(index) {
      this.content.data.list.splice(index, 1);
    },
    editSubmit() {
      this.$emit("submit");
    },
  },
  watch: {
    value1(val) {
      this.flag = !this.flag;
    }
  }
};
</script>

<style scoped>
.banner_box {
  width: 500px;
  text-align: left;
}
.banner_image_list img {
  width: 100px;
  height: 100px;
}
.banner_list_item {
  margin: 10px 0;
  position: relative;
}
.banner_list_item >>> .el-button {
  position: absolute;
  top: 0;
}
.banner_chooseimg {
  margin: 10px 0;
}
.banner_node {
  color: #04a292;
  margin: 10px 0;
}
.banner_end {
  text-align: center;
}
</style>