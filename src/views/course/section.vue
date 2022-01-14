<template>
  <el-card>
    <div class="header">课程名称</div>
    <el-tree :data="sections"
             :props="defaultProps"
             :allow-drop="handleAllowDrop"
             draggable>
      <div class="inner"
           slot-scope="{node, data}">
        <span>{{node.label}}</span>
        <span v-if="data.sectionName"
              class="actions">
          <el-button>编辑</el-button>
          <el-button type="primary">添加课时</el-button>
          <el-select class="select-status"
                     v-model="data.status"
                     placeholder="请选择">
            <el-option label="已隐藏"
                       :value="0" />
            <el-option label="待更新"
                       :value="1" />
            <el-option label="已更新"
                       :value="2" />
          </el-select>
        </span>
        <span v-else
              class="actions">
          <el-button>编辑</el-button>
          <el-button type="success"
                     @click="$router.push({name: 'course-video',
                     params: { courseId },
                     query: {
                      sectionId: node.parent.id,
                      lessonId: data.id,
                }})">上传视频</el-button>
          <el-select class="select-status"
                     v-model="data.status"
                     placeholder="请选择">
            <el-option label="已隐藏"
                       :value="0" />
            <el-option label="待更新"
                       :value="1" />
            <el-option label="已更新"
                       :value="2" />
          </el-select>
        </span>
      </div>
    </el-tree>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { getSectionAndLesson } from '@/services/course-section'
export default Vue.extend({
  name: 'CourseSection',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label: (data: any) => {
          return data.sectionName || data.theme
        }
      }
    }
  },
  created() {
    this.loadSections()
  },
  methods: {
    async loadSections() {
      const { data } = await getSectionAndLesson(this.courseId)
      this.sections = data.data
    },
    handleAllowDrop(draggingNode: any, dropNode: any, type: any) {
      // draggingNode 拖动的节点
      // dropNode 放置的目标节点
      return (
        draggingNode.data.sectionId === dropNode.data.sectionId &&
        type !== 'inner'
      )
    }
  }
})
</script>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.inner {
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}

::v-deep .el-tree-node__content {
  height: auto;
}

.select-status {
  max-width: 100px;
  margin-left: 8px;
}
</style>
