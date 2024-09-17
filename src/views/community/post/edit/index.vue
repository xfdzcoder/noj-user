<template>
  <div class="container">
    <el-form :model="form">
      <div class="inline">
        <el-form-item label="类型">
          <el-select v-model="form.type">
            <el-option :label="'讨论贴'" :value="0" />
            <el-option :label="'错题反馈'" :value="1" />
            <el-option :label="'新题建议'" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="标签" class="tag">
          <el-select
            multiple
            filterable
            allow-create
            default-first-option
            v-model="selectTags"
          >
            <el-option
              v-for="item in tags"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="置顶">
          <el-switch v-model="form.topped">置顶</el-switch>
        </el-form-item>
        <div class="grow" />
        <el-form-item class="operate">
          <el-button type="info" @click="onDraft">存为草稿</el-button>
          <el-button type="primary" @click="onDeploy">发布</el-button>
        </el-form-item>
      </div>
      <el-form-item label="标题">
        <el-input type="text" v-model="form.title" />
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea" v-model="form.summary" />
      </el-form-item>
      <el-form-item label="正文" class="content">
        <editor-md
          style="height: 100%; width: 100%"
          v-model="form.content"
          :md-rules="{
                linkify: {
                  fuzzyLink: false,
                },
              }"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { PostInfoReq } from '@/api/community'
import { useRoute } from 'vue-router'
import { EditorMd } from 'vue-devui'
import { deploy } from '@/api/community/post'
import { ElMessage } from 'element-plus'
import router from '@/router'

defineOptions({
  name: 'CommunityPostEditor'
})
const route = useRoute()

const form = ref<PostInfoReq>({
  communityInfoId: route.params.communityInfoId as string,
  content: '',
  status: 0,
  summary: '',
  tags: '',
  title: '',
  topped: false,
  type: 0
})
const selectTags = ref<string[]>([])
const tags = ref<string[]>([])


const onDraft = () => {

}
const onDeploy = () => {
  form.value.tags = selectTags.value.join(',')
  form.value.status = 1
  deploy(form.value)
    .then(res => {
      ElMessage.success('发布成功')
      router.back()
    })
}

</script>

<style scoped>
.container .el-form {
  display: flex;
  flex-direction: column;
  height: 90vh;
}

.inline {
  display: flex;
  width: 100%;
  align-items: center;
}
.inline .el-form-item {
  width: 200px;
  margin-right: 20px;
}
.inline .tag {
  width: 300px;
}
.grow {
  flex: 1;
}
.inline .operate {
  align-self: flex-end;
  margin-right: 0;
}
:deep(.operate .el-form-item__content) {
  display: flex;
  justify-content: flex-end;
}

.content {
  flex: 1;
  overflow: auto;
}
</style>
