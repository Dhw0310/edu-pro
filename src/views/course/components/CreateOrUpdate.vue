<template>
  <div>
    <el-card>
      <div slot="header">
        <el-steps :active="activeStep"
                  finish-status="success"
                  simple
                  style="margin-top: 20px">
          <el-step v-for="(item, index) in steps"
                   :title="item.title"
                   :key="index"
                   @click.native="activeStep = index"></el-step>
        </el-steps>
      </div>
      <el-form>
        <div v-show="activeStep === 0">
          <el-form-item label="课程名称">
            <el-input v-model="course.courseName"></el-input>
          </el-form-item>
          <el-form-item label="课程简介">
            <el-input v-model="course.brief"></el-input>
          </el-form-item>
          <el-form-item label="课程概述">
            <el-input style="margin-bottom: 10px"
                      v-model="course.previewFirstField"
                      type="textarea"
                      placeholder="概述1"></el-input>
            <el-input v-model="course.previewSecondField"
                      type="textarea"
                      placeholder="概述2"></el-input>
          </el-form-item>
          <el-form-item label="讲师姓名">
            <el-input v-model="course.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="讲师简介">
            <el-input v-model="course.teacherDTO.description"></el-input>
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number v-model="course.sortNum"
                             label="描述文字"></el-input-number>
          </el-form-item>
        </div>
        <div v-show="activeStep === 1">
          <el-form-item label="课程封面">
            <course-image :limit="5"
                          v-model="course.courseListImg" />
          </el-form-item>
          <el-form-item label="课程封面">
            <course-image :limit="5"
                          v-model="course.courseImgUrl" />
          </el-form-item>
        </div>
        <div v-show="activeStep === 2">
          <el-form-item label="售卖价格">
            <el-input v-model.number="course.discounts"
                      type="number">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model.number="course.price"
                      type="number">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model.number="course.sales"
                      type="number">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="course.discountsTag"></el-input>
          </el-form-item>
        </div>
        <div v-show="activeStep === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch v-model="isSckill"></el-switch>
          </el-form-item>
          <template v-if="isSckill">
            <el-form-item label="开始时间">
              <el-date-picker type="datetime"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker type="datetime"
                              value-format="yyyy-MM-dd"
                              placeholder="选择日期时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input v-model.number="course.activityCourseDTO.amount"
                        type="number">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input v-model.number="course.activityCourseDTO.stock"
                        type="number">
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="activeStep === 4">
          <el-form-item label="课程详情">
            <text-editor v-model="course.courseDescriptionMarkDown" />
            <!-- <el-input type="textarea"
                      v-model="course.courseDescriptionMarkDown"></el-input> -->
          </el-form-item>
          <el-form-item label="是否发布">
            <el-switch v-model="course.status"
                       :active-value="1"
                       :inactive-value="0"
                       active-color="#13ce66"
                       inactive-color="#ff4949" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary"
                       @click="handleSave">保存</el-button>
          </el-form-item>
        </div>
        <el-form-item>
          <el-button v-if="activeStep >= 0 && activeStep < 4"
                     @click="activeStep++">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getCourseById, saveOrUpdateCourse } from '@/services/course'
import CourseImage from './CourseImage.vue'
import TextEditor from '@/components/TextEditor/index.vue'
import dayjs from 'dayjs'

export default Vue.extend({
  name: 'CreateOrUpdateCourse',
  components: {
    CourseImage,
    TextEditor
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    courseId: {
      type: [String, Number]
    }
  },
  data() {
    return {
      activeStep: 0,
      steps: [
        { title: '基本信息' },
        { title: '课程封面' },
        { title: '销售信息' },
        { title: '秒杀活动' },
        { title: '课程详情' }
      ],
      isSckill: false,
      course: {
        // id: 0,
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          teacherHeadPicUrl: '',
          position: '',
          description: ''
        },
        courseDescriptionMarkDown: '',
        price: 0,
        discounts: 0,
        priceTag: '',
        discountsTag: '',
        isNew: true,
        isNewDes: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        previewFirstField: '',
        previewSecondField: '',
        status: 0, // 0：未发布，1：已发布
        sales: 0,
        activityCourse: false, // 是否开启活动秒杀
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0
        },
        autoOnlineTime: ''
      }
    }
  },
  created() {
    if (this.isEdit) {
      this.loadCourse()
    }
  },
  methods: {
    async handleSave() {
      const { data } = await saveOrUpdateCourse(this.course)
      console.log(data)
    },
    async loadCourse() {
      const { data } = await getCourseById(this.courseId)
      const { activityCourseDTO } = data.data
      if (activityCourseDTO) {
        activityCourseDTO.beginTime = dayjs(activityCourseDTO.beginTime).format(
          'YYYY-MM-DD'
        )
        activityCourseDTO.endTime = dayjs(activityCourseDTO.endTime).format(
          'YYYY-MM-DD'
        )
      }
      this.course = data.data
    }
  }
})
</script>

<style lang="scss" scoped>
.el-step {
  cursor: pointer;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
