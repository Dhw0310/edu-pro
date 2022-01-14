<template>
  <div v-if="menu.shown">
    <el-submenu v-if="menu.subMenuList && menu.subMenuList.some(item => item.shown)"
                :index="menu.href">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{menu.name}}</span>
      </template>
      <menu-item v-for="subMenu in menu.subMenuList"
                 :key="subMenu.description"
                 :menu="subMenu"></menu-item>
    </el-submenu>
    <el-menu-item v-else
                  :index="menu.href">
      <i class="el-icon-setting"></i>
      <span slot="title">{{menu.name}}</span>
    </el-menu-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'MenuItem',
  props: {
    menu: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="sass" scoped>
</style>
