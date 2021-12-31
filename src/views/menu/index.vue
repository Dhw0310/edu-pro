<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <el-button @click="$router.push({name: 'menu-create'})">添加菜单</el-button>
      </div>
      <el-table :data="menus"
                style="width: 100%">
        <el-table-column type="index"
                         min-width="150"
                         label="编号">
        </el-table-column>
        <el-table-column prop="name"
                         min-width="150"
                         label="菜单名称">
        </el-table-column>
        <el-table-column prop="level"
                         min-width="150"
                         label="菜单级数">
        </el-table-column>
        <el-table-column prop="icon"
                         min-width="150"
                         label="前端图标">
        </el-table-column>
        <el-table-column prop="orderNum"
                         min-width="150"
                         label="排序">
        </el-table-column>
        <el-table-column min-width="200"
                         label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini"
                       type="danger"
                       @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import { deleteMenu, getAllMenus } from '@/services/menu'
import Vue from 'vue'
export default Vue.extend({
  name: 'MenuIndex',
  data() {
    return {
      menus: []
    }
  },
  created() {
    this.getAllMenu()
  },
  methods: {
    async getAllMenu() {
      const { data } = await getAllMenus()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleEdit(item: { [propsName: string]: any }) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: item.id
        }
      })
    },
    handleDelete(item: { [propsName: string]: any }) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteMenu(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.getAllMenu()
          }
        })
        .catch((err) => {
          this.$message.error(`删除 ${err}`)
        })
      console.log(item)
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
