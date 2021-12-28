<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar shape="square"
                   :size="40"
                   :src="userInfo.portrait || require('@/assets/default-avatar.png')"></el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>用户ID</el-dropdown-item>
        <el-dropdown-item divided
                          @click.native="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  name: 'AppHeader',
  data() {
    return {
      userInfo: {}
    }
  },
  methods: {
    async loadUserInfo() {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    handleLogout() {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.commit('setUser', null)
          this.$router.push({
            name: 'login'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          })
        })
    }
  },
  created() {
    this.loadUserInfo()
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .el-dropdown-link {
    cursor: pointer;
  }
}
</style>
