<template>
  <div class="text-editor"
       ref="editor"></div>
</template>

<script lang="ts">
import { uploadCourseImage } from '@/services/course'
import Vue from 'vue'
import E from 'wangeditor'
export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted() {
    // 组件已经渲染好，可以初始化操作 DOM
    this.initEditor()
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor as any)
      // 事件监听必须在 create 之前
      editor.config.onchange = (value: string) => {
        this.$emit('input', value)
      }

      editor.config.customUploadImg = async function (
        resultFiles: any,
        insertImgFn: any
      ) {
        console.log(resultFiles)
        console.log(insertImgFn)
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        insertImgFn(data.data.name)
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法

        // 上传图片，返回结果，将图片插入到编辑器中
        // insertImgFn(imgUrl)
      }
      editor.create()
      editor.txt.html(this.value)
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
