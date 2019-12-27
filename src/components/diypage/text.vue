<template>
  <div id="text">
    <div class="edit_box">
      <vue-wangeditor
        @change="onEditorChange"
        ref="editor"
        id="editor"
        width="320"
        height="130"
        :menus="editorOptions.menu"
      ></vue-wangeditor>
    </div>
    <el-button @click="editSubmit" class="edit_end" size="mini" round>提交</el-button>
  </div>
</template>

<script>
import vueWangeditor from "vue-wangeditor";
export default {
  components: {
    vueWangeditor
  },
  props: {
    content: {
      type: Object,
      default: {
        type: "text",
        data: {
          html: ""
        }
      }
    }
  },
  data() {
    return {
      editorOptions: {
        menu: [
          "bold",
          "underline", // 下划线
          "italic", // 斜体
          "strikethrough", // 中线
          "eraser", // 清空格式
          "forecolor", // 文字颜色
          "bgcolor",
          "alignleft", // 左对齐
          "aligncenter", // 居中
          "alignright",
          "fontfamily", // 字体
          "fontsize", // 字号
          "head" // 标题
        ]
      }
    };
  },
  watch: {
    "content.data.html"(newVal) {
      newVal || this.$refs.editor.setHtml("");
    }
  },
  mounted() {
    this.$refs.editor.setHtml(this.content.data.html);
  },
  methods: {
    editSubmit() {
      this.$emit("submit");
    },
    onEditorChange() {
      this.content.data.html = this.$refs.editor.getHtml();
    }
  }
};
</script>

<style scoped>
.edit_box {
  position: relative;
  height: 190px;
}
.edit_end {
  margin-top: 20px;
}
</style>
