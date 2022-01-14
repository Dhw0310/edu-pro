<template>
  <el-menu default-active="4"
           @open="handleOpen"
           @close="handleClose"
           background-color="#545c64"
           text-color="#fff"
           active-text-color="#ffd04b"
           router>
    <menu-item v-for="item in menuList"
               :key="item.id"
               :menu="item"></menu-item>
  </el-menu>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import MenuItem from './MenuItem.vue'
export default Vue.extend({
  components: { MenuItem },
  name: 'AppMenu',
  computed: {
    ...mapState(['menuList'])
  },
  methods: {
    handleOpen(key: string, keyPath: string): void {
      console.log(key, keyPath)
    },

    handleClose(key: string, keyPath: string): void {
      console.log(key, keyPath)
    }
  }
})
</script>

<style>
</style>
