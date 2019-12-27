<style scoped>
#page {
  width: 100%;
  height: 100%;
}
.page-container {
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  text-align: left;
}
.page-wrapper {
  width: 100%;
  position: relative;
  margin-top: 20px;
}
.page-edit {
  position: absolute;
  bottom: 0;
  width: 65px;
  height: 17px;
  z-index: 99;
  color: white;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-around;
  right: 0;
  border-radius: 20px;
}
.page-edit > div {
  text-align: center;
  cursor: pointer;
  flex: 1;
}
.page-edit > div:hover {
  color: #04a292;
}
.page-cube {
  width: 100%;
  position: relative;
  overflow: hidden;
}
.cube-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
}
.cube-wrapper > div {
  position: absolute;
}
.page-text {
  width: 100%;
}
.page-shop-0 > img {
  width: 100%;
}
.page-shop-1 > img {
  width: 50%;
  height: 50%;
}
.page-shop-2 > img {
  width: 30%;
}
.page-image > img {
  width: 100%;
}
</style>
<template>
  <div id="page" ref="page">
    <div class="page-container" v-for="(conItem, conIndex) in options.content">
      <div class="page-wrapper">
        <template v-if="conItem.type == 'cube'">
          <div class="page-cube" :style="{ height: conItem.data.height + 'px' }">
            <div class="cube-wrapper" :style="{ top: conItem.data.top + 'px' }">
              <template v-for="item in conItem.data.list">
                <div
                  :style="{
                  top: item.top + 'px',
                  left: item.left + 'px',
                  width: item.width + 'px',
                  height: item.height + 'px',
                  backgroundImage: 'url(' + item.image + ')',
                  backgroundColor: item.color,
                  backgroundSize:'100% 100%',
                }"
                ></div>
              </template>
            </div>
          </div>
        </template>
        <template v-else-if="conItem.type == 'text'">
          <div class="page-text" v-html="conItem.data.html"></div>
        </template>
        <template v-else-if="conItem.type == 'shop'">
          <div :class="'page-shop ' + 'page-shop-' + conItem.data.style">
            <template v-for="shopItem in conItem.data.list">
              <img :src="shopItem.url" alt />
            </template>
          </div>
        </template>
        <template v-else-if="conItem.type == 'image'">
          <div :class="'page-image'">
            <img :src="conItem.data.url" alt />
          </div>
        </template>
        <template v-else-if="conItem.type == 'banner'">
          <div :class="'page-banner banner-' + conItem.data.list.length">
            <template v-for="bannerItem in conItem.data.list">
              <a :href="bannerItem.link">
                <img :src="bannerItem.image" alt :style="{height:bannerItem.height}" />
              </a>
            </template>
            <a v-if="conItem.data.list.length" :href="conItem.data.list[0].link">
              <img :src="conItem.data.list[0].image" alt />
            </a>
          </div>
        </template>
        <template v-else-if="conItem.type == 'slider'">
          <div :class="'page-slider'" :style="{height:conItem.data.height + 'px'}"></div>
        </template>
        <template v-else-if="conItem.type == 'dashed'">
          <div :class="'page-dashed'">
            <hr style="border:1px dashed; line-height:38px" />
          </div>
        </template>
        <div class="page-edit">
          <div @click="editItem(conItem, conIndex, $event)">编辑</div>
          <div @click="options.content.splice(conIndex, 1), options.method=''">删除</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./banner.css";
export default {
  props: {
    options: {
      type: Object,
      default: {
        content: [],
        pageIndex: 0,
        method: ""
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    container() {
      return this.$refs.page;
    }
  },
  methods: {
    editItem(conItem, conIndex, e) {
      this.options.method = "";
      if (conItem.type != "dashed") {
        setTimeout(() => {
          this.options.pageIndex = conIndex;
          this.options.method = conItem.type;
          this.options.editTop = e.target.parentNode.parentNode.offsetTop;
        });
      }
    }
  }
  // watch: {
  //   "content.type": {
  //     handler(newName, oldName) {
  //       console.log(newname, oldName);
  //     },
  //     deep: true
  //   }
  // }
};
</script>
