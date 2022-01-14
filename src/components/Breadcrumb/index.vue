<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item v-for="route in routeRecords"
                        :key="route.path">{{route.meta && route.meta.title}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Brandcrumb',
  computed: {
    routeRecords() {
      return this.$route.matched
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
