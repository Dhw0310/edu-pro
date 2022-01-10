<template>
  <div class="resource-list">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <el-form :inline="true"
                 :model="form"
                 class="demo-form-inline">
          <el-form-item prop="name"
                        label="资源名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="url"
                        label="资源路径">
            <el-input v-model="form.url"></el-input>
          </el-form-item>
          <el-form-item prop="categoryId"
                        label="资源分类">
            <el-select v-model="form.categoryId"
                       placeholder="请选择资源分类"
                       clearable>
              <el-option :label="item.name"
                         :value="item.id"
                         v-for="item in resourceCategories"
                         :key="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       :disabled="isLoading"
                       @click="onSubmit">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="resources"
                row-key="id"
                v-loading="isLoading"
                style="width: 100%">
        <el-table-column type="selection"
                         :reserve-selection="true"
                         label="编号"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         label="资源名称"
                         width="180">
        </el-table-column>
        <el-table-column prop="url"
                         label="资源路径">
        </el-table-column>
        <el-table-column prop="description"
                         label="描述">
        </el-table-column>
        <el-table-column prop="createdTime"
                         label="添加时间">
          <template slot-scope="scope">
            {{scope.row.createdTime | formData}}
          </template>
        </el-table-column>
        <el-table-column prop="url"
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
      <div class="block">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :disabled="isLoading"
                       :current-page="this.form.current"
                       :page-sizes="[5,10,20]"
                       :page-size="form.size"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'
import { Form } from 'element-ui'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
export default Vue.extend({
  name: 'ResourceList',
  data() {
    return {
      resources: [],
      form: {
        user: '',
        region: '',
        current: 1, // 默认查询第1页数据
        size: 5, // 每页大小
        categoryId: null // 资源分类
      },
      totalCount: 0,
      resourceCategories: [],
      isLoading: true
    }
  },
  filters: {
    formData(dataTime: Date) {
      return dayjs(dataTime).format('YYYY-MM-DD')
    }
  },
  created() {
    this.loadResources()
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories() {
      const { data } = await getResourceCategories()
      this.resourceCategories = data.data
    },
    onSubmit() {
      this.form.current = 1 // 筛选查询从第 1 页开始
      this.loadResources()
    },
    async loadResources() {
      this.isLoading = true
      const { data } = await getResourcePages({
        current: this.form.current,
        size: this.form.size
      })
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    handleEdit(item: any) {
      console.log(item)
    },
    handleDelete(item: any) {
      console.log(item)
    },
    handleSizeChange(val: number) {
      this.form.size = val
      this.form.current = 1
      this.loadResources()
    },
    handleCurrentChange(val: number) {
      console.log(`当前页: ${val}`)
      this.form.current = val
      this.loadResources()
    },
    onReset() {
      this.form.current = 1
      this.loadResources()
      ;(this.$refs.form as Form).resetFields()
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
