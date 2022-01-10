<template>
  <div>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <!-- <span>筛选搜索</span> -->
        <el-form ref="form"
                 :model="form">
          <el-form-item label="角色名称"
                        prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       v-MyDebounce="onSubmit">查询搜索</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-button v-MyDebounce="handleAdd">添加角色</el-button>
      <el-table :data="roles"
                style="width: 100%">
        <el-table-column prop="id"
                         label="编号" />
        <el-table-column prop="name"
                         label="角色名称" />
        <el-table-column prop="description"
                         label="描述" />
        <el-table-column prop="createdTime"
                         label="添加时间" />
        <el-table-column label="操作"
                         align="center"
                         width="150px">
          <template slot-scope="scope">
            <div>
              <el-button type="text"
                         @click="$router.push({name: 'alloc-menu',params:{roleId: scope.row.id}})">分配菜单</el-button>
              <el-button type="text">分配资源</el-button>
            </div>
            <div>
              <el-button type="text"
                         @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini"
                         type="text"
                         @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :title="isEdit ? '编辑角色': '添加角色'"
               :visible.sync="dialogVisible"
               width="30%">
      <create-or-edit-role v-if="dialogVisible"
                           :role-id="roleId"
                           :is-edit="isEdit"
                           @success="onSuccess"
                           @cancel="dialogVisible = false" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoles } from '@/services/role'
import CreateOrEditRole from './CreateOrEdit.vue'
export default Vue.extend({
  components: { CreateOrEditRole },
  name: 'RoleList',
  data() {
    return {
      roles: [], // 角色列表
      form: {
        current: 1,
        size: 50,
        name: ''
      }, // 查询条件
      dialogVisible: false, // dialog显示控制
      loading: false,
      roleId: null,
      isEdit: false
    }
  },
  created() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      this.loading = true
      const { data } = await getRoles(this.form)
      this.roles = data.data.records
      this.loading = false
    },
    onSubmit() {
      console.log('submit')
    },

    handleEdit(role: any) {
      console.log(role)
      this.dialogVisible = true
      this.isEdit = true
      this.roleId = role.id
    },

    handleDelete(role: any) {
      console.log(role)
    },
    onReset() {
      console.log('reset')
    },
    handleAdd() {
      this.dialogVisible = true
      this.isEdit = false
    },
    onSuccess() {
      this.dialogVisible = false
      this.loadRoles()
    }
  }
})
</script>

<style>
</style>
