<template>
  <div class="edit-create">
    <create-or-edit :isEdit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'
export default Vue.extend({
  name: 'Edit',
  data() {
    return {}
  },
  components: { CreateOrEdit },
  methods: {}
})
</script>

<style>
</style>
