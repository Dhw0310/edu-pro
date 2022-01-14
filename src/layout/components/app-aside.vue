<template>
  <div class="aside">
    <router-link class="logo"
                 to="/"
                 title="Back to Home">
      <!-- <img src="./logo.png"
           alt="LagouEdu"> -->
      <h1>Edu Boss</h1>
    </router-link>
    <app-menu></app-menu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import AppMenu from '@/components/AppMenu/index.vue'

export default Vue.extend({
  name: 'AppAside',
  components: {
    AppMenu
  }
})
</script>

<style lang="scss" scoped>
.aside {
  height: 100%;
  .el-menu {
    width: 200px;
    // min-height: 100vh;
    height: 100%;
  }
}
</style>
