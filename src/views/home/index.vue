<template>
  <div class="course">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Home',
  created() {
    /**
     * var str2 = str1.replace(/<([a-zA-Z1-6]+)(\s*[^>]*)?>/g, "<$1>");  //结果：<span>这里是内容区域</span>
    var str2 = str2.replace(/<span>([^<]*?)<\/span>/gi, '$1'); //结果：这里是内容区域，如果span标签没有任何style或者class等属性，可以省略上一步
    console.log(str2);
     */
    const str = '<div>我<span>们^$?][*都是</span></div>'
    const a = str.replace(/<([a-zA-Z1-6]+)(\s*[^>]*)?>/g, '<$1>')
    const b = a.replace(/<span>([^<]*?)<\/span>/gi, '$1')
    console.log(b)
  }
})
</script>

<style lang="scss" scoped>
</style>
