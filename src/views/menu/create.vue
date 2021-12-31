<template>
  <div class="menu-create">
    <create-or-edit />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'
export default Vue.extend({
  name: 'MenuCreate',
  data() {
    return {}
  },
  components: { CreateOrEdit },
  methods: {}
})
</script>

<style>
</style>
